import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.sun.tools.javac.util.List;

//以下注意事項
/*Javaでは、メソッド名の先頭は小文字*/

class Examle {
    public static void main(String[] args) {
        // 画面に出力
        system.out.println("Hello World");
        /*
         * キーボードからの入力 Scanner sc = new Scanner(System.in);←キーボード入力のための準備 String str =
         * sc.nextLine();←データはString型となる int number= sc.nextInt();←データはint型になる
         */

        // 代入演算子
        int num = 10;
        num += 10;// num = num + 10

        // 配列
        String[] str_list = { "apple", "orange", "tomato" };
        // 配列の数
        System.out.println(str_list.length);
        // for文
        for (int i = 0; i < str_list.length; i++) {
            system.out.println(str_list[i]);
        }

        // List型の変数を作る
        java.util.List<Integer> arrayList = new ArrayList<Integer>();
        arrayList.add(100);
        arrayList.add(200);
        arrayList.add(300);
        // 拡張for文
        for (Integer/* (データ型) */ array/* (変数名) */ : arrayList/* (配列またはコレクション) */) {
            system.out.println(array);
        }

        // Map型の変数を作る
        Map<Integer, String> players = new HashMap<Integer, String>();
        players.put(1, "takaya");
        players.put(2, "kakaya");
        players.put(3, "yakaya");
        for (Map.Entry<Integer, String> entry : players.entrySet()) {
            system.out.println(entry.getKey());
            system.out.println(entry.getValue());
        }

        // 数値→文字列に変換
        num = 123;
        String str = Integer.toString(num);
        // 文字列→数値に変換
        string str_toInt = "123";
        num = Integer.parseInt(str_toInt);
        // ただし、Parseだと例外の発生があるため、注意

        // 文字列の分割
        str = "りんこ,すいか,ぶどう";
        String[] fruit = str.split(",");

        // if文(pythonでは&&はand,||はor)
        if (1 == 3 && 1 == 2) {
            system.out.println("Yes");
        } else if (3 == 2 || 2 == 3) {
            system.out.println("No");
        } else {
            system.out.println("True");
        }

    }
}
