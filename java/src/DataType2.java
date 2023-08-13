public class DataType2{
	public static void main (String [] args){
		// 浮点类型的常量有两种形式：
		// 十进制形式：
		double num1 = 3.14;
		System.out.println(num1);


	 	// 科学计数法形式

	 	double num2 = 314E-2;
	 	System.out.println(num2); 


	 	// 浮点类型的变量
	 	// 注意：浮点类型默认是double类型的，要想将一个double类型的数赋给float类型，必须后面加上F或者f

	 	float f1 = 3.1423456789923323F;
	 	System.out.println(f1);

	 	// 注意：double类型后面可以加D或者d, 但是一般我们都省略不写
	 	double d1 = 3.1423456789333D;

	 	System.out.println(d1);

	 	// 注意：我们最好不要进行浮点类型的比较

	 	float f2 = 0.3F;
	 	double d2 = 0.3;

	 	System.out.println(f2 == d2);
	}
}
