# 注意事項
# 処理内容をまとめた部分をブロックと呼び、半角スペース4文字空ける
import datetime


def memo():
    print('Hello World!')

    # 文字列から数値への変換と数値から文字列への変換
    print(int('123'))
    print(str(123))
    print('{}'.format(123))

    # 文字列の分割
    str_abc = 'aaa,bbb,ccc'
    print(str_abc.split(','))

    # if文(Java,C#ではandは&&,orは||)
    if(1 == 1) and (1 == 2):
        print('Yes')
    elif(2 == 2) or (2 == 3):
        print('No')
    elif 'aa' in str_abc:
        print('No')
    else:
        print('True')

    # 配列の設定
    fruits = ['apple', 'orange']
    fruits.append('banana')
    if 'apple' in fruits:
        print('Yes')
    # fruits[-1]を指定すると最後の要素「banana」を取得できる。
    # 要素の削除
    fruits.remove('banana')
    # 最後の要素を抜き出し削除する
    print(fruits.pop())
    # 最後の要素であるorangeが出力され、削除される

    # 繰り返し
    for fruit in fruits:
        print(fruit)

    # Dictionary型
    dic_fruits = {'apple': 100, 'orange': 150}
    # Dictionaryに追加
    dic_fruits['banana'] = 200
    # Dictionary型の中身を出力
    for key, value in dic_fruits.items():
        print(key, value)

    # 現在時刻の取得(import datetime)
    print(datetime.datetime.now())


# ファイルの取り扱い
def writeFile(fileName):
    with open(fileName, 'a') as f:
        f.write('Pythonからファイルに書き込みをします。\n')


# メソッドのサンプル、引数と戻り値の扱い
def arg_return_memo(name):
    name += 'と愉快な仲間たち'
    return '返り値は'+name+'です'


memo()
print(arg_return_memo('Takaya Sato'))
