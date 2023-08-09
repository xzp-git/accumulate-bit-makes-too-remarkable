public class DataType4{
	public static void main(String[] args){
		

		double d = 6;//int -> double 自动类型转换


		System.out.println(d);


		int i = (int)6.5;// double -> int 强制类型转换
		System.out.println(i);


		// 在同一个表达式中，有多个数据类型的时候，应该如何处理

		// 多种数据类型参与运算的时候，整数类型，浮点类型，字符类型都可以参与运算，唯独布尔类型不可以参与运算


		// double d2 = 12 + 1294L + 8.5F + 3.81 + 'a' + true;

		double d2 = 12 + 1294L + 8.5F + 3.81 + 'a';

		System.out.println(d2);
		

		/**
		 * 类型级别：（从低到高）
		 * byte,short,char, -> int -> long -> float -> double
		 * 级别用来做什么？当一个表达式中有多重数据类型的时候，要找出当前表达式中级别最高的那个类型，然后
		 * 其余的类型都转换为当前表达式中级别最高的类型进行计算
		 * 
		 * double d2 = 12 + 1294L + 8.5F + 3.81 + 'a';
		 * 			 = 12.0 + 1294.0 + 8.5 + 3.81 + 97.0
		 * 
		 * 
	    */

	    int i2 = (int)(12 + 1294L + 8.5F + 3.81 + 'a'); // 右侧计算的结果是double类型 需要强转

	    System.out.println(i2);

	    /**
	     * 
	     * 在进行运算的时候比较两边类型的级别：
	     * 左 = 右：直接赋值
	     * 左 < 右：强转
	     * 左 > 右: 直接自动转换
	     * 
		*/

		// 以下情况属于特殊情形：对于byte，short， char 类型来说，只要在他们的表数范围内，赋值的时候就不需要进行
		// 强转了直接赋值即可。


		byte b = 13;  //整数默认是 int 类型  占4 字节 13在 byte的范围中 这样是可以的

		byte b2 = (byte)280; //超过范围了就需要强转了
	}
}




 
















