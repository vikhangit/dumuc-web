export const replaceStringByIndex = (str, index, char) => {
    var a = str.split("");
    a[index] = char;
    return a.join("");
}