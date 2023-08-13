import java.util.Scanner;

public class DataType5{
	public static void main (String [] args){



		final double PI = 3.14;  // 加 final 修饰后  定义好 就不能更改


		Scanner sc = new Scanner(System.in);
		System.out.println("请录入一个半径");

		int r = sc.nextInt();

		double c = 2 * PI * r;

		System.out.println(c);


		double s = PI * r * r;

		System.out.println(s);
	}
}