const imageModule = (function () {
  let columns = Array.from(document.querySelectorAll(".column")),
    loadingBox = document.querySelector(".loadingBox"),
    lazyImageBoxs;

  // 创建一个监听器，处理图片的延迟加载
  let config = {
    threshold: [0], //0 一露头 0.5 一半 1完全出现
  };

  let ob = new IntersectionObserver((changes) => {
    changes.forEach((item) => {
      const {
        isIntersecting, //完全出现在视口中会变为true
        target,
      } = item;
      if (isIntersecting) {
        // 完全出现在视口中
        singleImgLoading(target);
        //移除对当前盒子的监听
        ob.unobserve(target);
      }
    });
  }, config);

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

      // 把三个列按照现在的高度进行排序(降序)
      columns.sort((a, b) => b.offsetHeight - a.offsetHeight);

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
    lazyImageBoxs
      .filter((imgBox) => imgBox.getAttribute("isWatch") !== "TRUE")
      .forEach((imgBox) => {
        ob.observe(imgBox);
        imgBox.setAttribute("isWatch", "TRUE");
      });
  };
  const watchBottom = function watchBottom() {
    let obLoading = new IntersectionObserver(async (changes) => {
      let item = changes[0];
      if (item.isIntersecting) {
        //到底部了， 加载更多的数据
        let data = await utils.ajax("./data.json");
        bindHTML(data);
        lazyImgsFunc();
      }
    });
    obLoading.observe(loadingBox);
  };
  return {
    //模块入口， 管控执行的逻辑
    async init() {
      let data = await utils.ajax("./data.json");
      bindHTML(data);
      lazyImgsFunc();
      watchBottom();
    },
  };
})();

imageModule.init();
