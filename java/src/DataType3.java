public class DataType3{
	public static void main(String[] args){
		// 定义字符类型的变量
		char ch1 = 'a';
		System.out.println(ch1);

		char ch2 = 'A';
		System.out.println(ch2);

		char ch3 = '4';
		System.out.println(ch3);

		char ch4 = '中';
		System.out.println(ch4);

		char ch5 = '?';
		System.out.println(ch5);

		// 字符类型：单引号引起来的单个字符
		char ch6 = ' ';
		System.out.println(ch6);

		// Java 中无论 字母、数字、符号、总问都是字符类型的常量，都占用2个字节。


		System.out.println("---------------------------");

		/**
		 * 
		 * 转义字符：将后面的普通字符转换为特殊含义
		 * 
		 * 
		*/

		char ch7 = '\n';


		System.out.println("aaa" + ch7 + "bbb");

		System.out.println("---------------------------");

		char cha = 'A';

		System.out.println(cha);//A

		System.out.println(cha + 90); // 155

		System.out.println(155 - cha); // 90

		// char类型我们看到的样子就是它本身的字面常量，但是底层在计算的时候，实际上是按照一个码进行计算的。
		// 这个码局势ASCLL码
		// 之前说char类型是按照Unicode码进行存储的，Unicode兼容了 ASCLL码， Unicode前128位是ASCLL码

		char chz = '中';
		System.out.println(chz + 1);


		int num1 = (int)chz;
		System.out.println(num1); //20013

		char ch = (char)num1;
		System.out.println(ch);

		int num2 = '中'; //20013

		char chn = 20013;
		System.out.println(chn);//中


		char ch9 = '2'+ 2; //  '2' -> 50   50 + 2 = 52

		System.out.println(ch9); // 52 对应的 ASCLL码是 '4'

		System.out.println("-------------------------")

		double d = 6 //int -> double 自动类型转换


		System.out.println(d);


		int i = (int)6.5;// double -> int 强制类型转换
		System.out.println(i);

		

	}
}




 
















