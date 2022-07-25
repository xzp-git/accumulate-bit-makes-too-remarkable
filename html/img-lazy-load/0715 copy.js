const imageModule = (function () {
  let columns = Array.from(document.querySelectorAll(".column")),
    loadingBox = document.querySelector(".loadingBox"),
    lazyImageBoxs;
  /**
   * 图片列表
   * @param {*} data
   */
  const bindHTML = (data) => {
    // 计算图片真实的高度
    data = data.map((item) => {
      let w = item.width,
        h = item.height;
      h = h / (w / 230);
      item.width = 230;
      item.height = h;
      return item;
    });

    //按照三个一组进行循环（最后一组）
    for (let i = 0; i < data.length; i += 3) {
      // 把三组数据按照高度排序（升序）
      let group = data.slice(i, i + 3);
      //把三个列按照现在的高度进行排序(降序)
      group.sort((a, b) => a.height - b.height);

      //循环三个数据中的每一项：每循环一项，创建一个card，把创建的card放到对应的列中即可
      group.forEach((item, index) => {
        let { pic, link, title, height } = item;
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<a href="${link}">
        <div class="lazyImageBox" style="height:${height}px">
          <img src="" alt="" data-img="${pic}">
        </div>
        <p>${title}</p>
      </a>`;
        columns[index].appendChild(card);
      });
    }
    // 获取所有需要延迟加载的盒子
    lazyImageBoxs = Array.from(document.querySelectorAll(".lazyImageBox"));
  };
  const singleImgLoading = (imgBox) => {
    let img = imgBox.querySelector("img"),
      trueImg = img.getAttribute("data-img"),
      tempImg = new Image();
    tempImg.src = trueImg;
    tempImg.onload = function () {
      img.src = trueImg;
      img.style.opacity = 1;
      tempImg = null;
    };
    imgBox.isLoad = true;
  };
  const lazyImgsFunc = () => {
    lazyImageBoxs.forEach((imgBox) => {
      if (imgBox.isLoad) return; //处理过就不在处理
      //方案一
      // let A = imgBox.offsetHeight + utils.offset(imgBox).top,
      //   //元素的高度 + padding                   元素向上卷去的高度
      //   B =
      //     document.documentElement.clientHeight +
      //     document.documentElement.scrollTop;

      //方案二
      let A = imgBox.getBoundingClientRect().bottom,
        B = document.documentElement.clientHeight;

      console.log(A);
      if (A <= B) singleImgLoading(imgBox); //盒子完全出现在视口中
    });
  };
  return {
    //模块入口， 管控执行的逻辑
    async init() {
      let data = await utils.ajax("./data.json");
      bindHTML(data);
      setTimeout(lazyImgsFunc);
      window.addEventListener("scroll", utils.throttle(lazyImgsFunc, 500));
    },
  };
})();

imageModule.init();
