export function setDOM(data) {
//这种比较耗性能，暂时想不到其他的，能实现效果了。
		　　setInterval(function() {
		　　　　document.querySelectorAll(".el-cascader-node__label").forEach(el => {
		　　　　　　el.onclick = function() {
		　　　　　　　　if (this.previousElementSibling) this.previousElementSibling.click();
		　　　　　　};
		　　　　});
		　　}, 1000);
}