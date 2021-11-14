# Dillinger
## Инструкция запуска

```sh
no need to install any npm packeges
```

1. Склонировать репозиторий
2. Открыть терминал по адресу папки
3. Запустить команды из примеров ниже

## Параметры
1.  **-c, --config**: конфиг для шифрования
Конфиг это строка c шаблоном `{XY(-)}n`, где:
  * `X` знак шифра:
    * `C` для шифра Цезаря (с шагом 1)
    * `A` для шифра Atbash
    * `R` для шифра ROT-8
  * `Y` флаг кодирования или декодирования (Обязателен для шифров **Цезаря** и **ROT-8** и отсутствует у шифра **Atbash**)
    * `1` для кодирования
    * `0` для декодирования
2.  **-i, --input**: путь к файлу для чтения (не обязательный параметр)
3.  **-o, --output**: путь к файлу для записи (не обязательный параметр)

Для примера, конфиг `"C1-C1-R0-A"` означает "закодировать шифром Цезаря => закодировать шифром Цезаря => закодировать шифром ROT-8 => использовать Atbash"

## Примеры 

```bash
$ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`
> output.txt
> `Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!`
```bash
$ node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`
> output.txt
> `Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!`
```bash
$ node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`
> output.txt
> `Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!`
```bash
$ node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
```

> input.txt
> `This is secret. Message about "_" symbol!`
> output.txt
> `This is secret. Message about "_" symbol!`

## Оценка

1. В `README.md` описано, как можно запустить программу из командной строки, описаны аргументы, которые можно передать приложению **плюс 10 баллов**.
2. Если переданы все аргументы и они корректны, приложение читает из файла и записывает в файл преобразованный текст, при этом предыдущие записи не удаляются **плюс 20 баллов**
3. Приложение работает в соответствии с описанными в задании примерами **плюс 30 баллов**
4. Если аргументы `input` и/или `output` ведут к несуществующему файлу либо директории,приложение передает соответствующее сообщение в `process.stderr` и прoцесс завершается с кодом, отличным от 0 **плюс 10 баллов**
5. Если любой из аргументов дублируется, приложение передает соответствующее сообщение в `process.stderr` и прoцесс завершается с кодом, отличным от 0 **плюс 10 баллов**
6. Если `config` невалиден или отсутствует, приложение передает соответствующее сообщение в `process.stderr` и прoцесс завершается с кодом, отличным от 0 **плюс 20 баллов**.
Объем валидации `config`:
    * проверяется, что `config` имеет формат `{XY(-)}n`
    * проверяется, что `X` соответствует одному из шифров
    * проверяется, что для ROT-8 и Цезаря присутствует элемент `Y`
    * проверяется, что для Атбаш отсутствует элемент `Y`
    * проверяется, что `Y` — это 1 или 0
7. Если не передан аргумент с путем до файла на чтение, то чтение осуществляется из `process.stdin` **плюс 10 баллов**
8. Если не передан аргумент с путем до файла на запись, то вывод осуществляется в `process.stdout` **плюс 10 баллов**
9. Шифруются/дешифруются только латинские буквы, регистр сохраняется, остальные символы не изменяются **плюс 20 баллов**
10. Если текст вводится из консоли, то программа не должна завершаться после выполнения шифровки/дешифровки введенного текста, т.е. должна быть возможность ввести еще текст **плюс 10 баллов**
11. Кодовая база не находится в одном файле, а разделена на файлы в соответствии с выполняемыми задачами (например - функция, преобразующая строку, в отдельном файле, код, создающий transform стрим, в отдельном файле, функция для парсинга и валидации аргументов в отдельном файле и т.п.) **плюс 10 баллов**

**Продвинутая реализация**
-  Для передачи сообщения в `process.stderr` используются `пользовательские ошибки` и их обработка **плюс 10 баллов**


#### Итого: 170 баллов

## Контактные данные

- **E-mail:** actionclaw@gmail.com
- **Discord:** Rampl#7226
- **Telegram:** [@KroshkaKlo](https://t.me/KroshkaKlo)