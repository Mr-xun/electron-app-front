//过滤人民币加单位
export const monneyFilter = (val: any) => {
    if (!val) return "---"
    val = val.toString().replace(/\$|\,/g, '');
    if (isNaN(val)) {
        val = "0";
    }
    let sign = (val == (val = Math.abs(val)));
    val = Math.floor(val * 100 + 0.50000000001);
    let cents: any = val % 100;
    val = Math.floor(val / 100).toString();
    if (cents < 10) {
        cents = "0" + cents
    }
    for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
    }
    return (((sign) ? '' : '-') + val + '.' + cents);
}
//过滤规格加单位
export const specificaFilter = (val: any) => {
    if (!val) return "---"
    return `1*${val}`;
}