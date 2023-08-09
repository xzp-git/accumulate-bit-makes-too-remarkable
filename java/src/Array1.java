public class Array1{
	public static void main (String[] args){
		// 声明

		int[] arr;
		int arr2[];

		int[] arr3 = null;//数组赋值为null 和 什么都没有赋值  不一样的效果


		// 创建 一个 长度为 4 的数组 
		arr = new int[4]; // 给数组开辟了一个长度为4 的空间

		// 数组初始化有默认值
		/**
		 * 
		 * 基本数据类型
		 * byte[] 0
		 * short[] 0
		 * int[] 0
		 * long[] 0
		 * float[] 0.0
		 * double[] 0.0
		 * char[] \u0000
		 * boolean[] false
		 * 
		 * 引用数据类型：null
		 * 
		 * 		 */

		 // 赋值

		 arr[0] = 12;
		 arr[1] = 47;
		 arr[2] = 95;
		 arr[3] = 27;

		 // arr[4] = 49; 数组索引越界赋值会出现异常


		 // 遍历

		 for (int nums : arr){
		 	System.out.println(nums);
		 }

		 // 动态初始化
		 int[] arr1 = new int[4];

		 arr[0] = 12;
		 arr[1] = 47;
		 arr[2] = 95;
		 arr[3] = 27;

		 // 静态初始化
		 int[] arr5 = {12, 23, 45};
		 int[] arr6 = new int[]{12, 23, 45}; 
		 // new int[3]{12, 23, 45};  错误写法
		 // int[] arr;
		 // arr = {12, 23, 45} 分开写 错误写法


		 //默认初始化

		 int[] arr7 = new int[4];  //默认初始化 就是 默认的值 就是 0

		 

		 for(String cur : args){
		 	System.out.println(cur);
		 }


	}

	public static void method1(int ...num){

	}
}