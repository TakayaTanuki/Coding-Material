//注意事項
//C#では基本的に、メソッド名の先頭は大文字

//paizaなどでC#を利用する場合、以下の名前空間を利用する必要あり。
//Console.WriteLine()を利用する場合、Systemを利用しないと、いちいち書く必要あり。
using System;
//Listを利用する場合
using System.Collections.Generic;


static void Main(string[] args)
{
    //コンソールに出力
    Console.WriteLine("Hello World");

    // 代入演算子
    int num = 10;
    num += 10;// num = num + 10

    // 配列
    float[] float_list = { 41.2f, 42.5f, 44.9f };
    // 配列の数
    Condole.WriteLine(float_list.length);
    // for文
    for (int i = 0; i < float_list.Length; i++)
    {
        Console.WriteLine(float_list[i]);
    }

    //List型の変数を作る
    List<float> weights = new List<float>();
    //Listの最後尾に要素を追加する
    weights.Add(41.2f);
    weights.Add(42.2f);
    weights.Add(43.2f);
    /* 
    Listの指定した位置に要素を挿入: weights.Insert(1(追加位置),41.5f)
    Listから特定の要素を削除する: weights.RemoveAt(2);
    Listから特定のデータを削除する: weights.RemoveAt(42.2f);
    Listの要素の位置を検索： weights.IndexOf(41.2f)→戻り値は値の位置
    Listの有無を調べる：weights.Contains(41.2f)→戻り値はBoolean型
    Listを昇順に並び替える：weights.Sort()
    Listを降順に並び替える：weights.Reverse()
    */
    // foreach文
    foreach (float/*型名*/ array/*変数名*/ in weights/*配列変数名*/)
    {
        Console.WriteLine(array);
    }

    //Dictionary型の変数を作る
    Dictionary<string, float> dic_weights = new Dictionary<string, float>();
    dic_weights.Add("1", 41.2f);
    dic_weights.Add("2", 42.2f);
    dic_weights.Add("3", 43.2f);
    foreach (keyvaluepair<string, float> w in dic_weights)
    {
        Console.WriteLine(w);
    }

    //数値→文字列に変換
    int num = 123;
    string str = int.ToString("0000");
    //文字列→数値に変換➀
    string str = "123";
    int num = int.Parse(str);
    //文字列→数値に変換➁
    /* TryParseで文字列型の値を数値型に変換している、
    第一引数の文字列が正しく数値に変換できた場合、第二引数に変換後の値を代入し、戻り値にtrueを返す。
    変換できなかった場合はfalseが返る。※outは参照型で値を渡す場合に必要で、つけないとビルドに失敗する。
    */
    bool sucess = int.TryParse(str, out num);



    //文字列の分割
    str = "りんこ,すいか,ぶどう";
    string[] fruit = str.split(',');
    //''(シングルクォーテーション)には注意！！！

    //if文(pythonでは&&はand,||はor)
    if (1 == 1 && 1 == 2)
    {
        Console.WriteLine("Yes");
    }
    else if (2 == 2 || 2 == 3)
    {
        Console.WriteLine("No");
    }
    else
    {
        Console.WriteLine("True");
    }

}


public class Hello{
    public static void Main(){
        // 自分の得意な言語で
        // Let's チャレンジ！！

        string line = System.Console.ReadLine();
        
        string[] box = line.Split(' ');
        string big_num = box[0];
        string small_num = box[1];
        double double_big_num = double.Parse(big_num);
        double m = System.Math.Pow(double_big_num,3);
        
        int double_small_num = int.Parse(small_num);
        double n = System.Math.Pow(double_small_num,3);
        double d = m-n;
        System.Console.WriteLine(d);
    }
}