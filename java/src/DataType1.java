public  class  DataType1{
	public static void main (String[] args){
		int num1 = 12;

		int num2 = 012;

		int num3 = 0b10;

		int num4 = 0x12;


		byte b = 126;

		short s = 2000;


		int i = 1234;


		// 整数类型默认就是 int 类型， 所以12345678910是一个int类型的数，对于int类型来说，他超出范围了
		// 要想把一个数给long类型变量，那么后面加上 L（推荐）或者 l 就可以了
		long num5 = 12345678910L; 

		// 注意：只有这个数超出int 类型的范围了后面 才需要加上L，否则无需加L也可以赋值给long类型

		long num6 = 9527;


		System.out.println(num6);
		System.out.println(num5);

	}
}