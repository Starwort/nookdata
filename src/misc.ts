type Dict<V> = {
    [key: string]: V;
}
var _getTextWidthDiv: HTMLDivElement;
function setUpDiv() {
    _getTextWidthDiv = document.createElement("div");
    _getTextWidthDiv.style.position = 'absolute';
    _getTextWidthDiv.style.top = '-9999px';
    _getTextWidthDiv.style.left = '-9999px';
    // _getTextWidthDiv.ariaHidden = true;
    document.body.appendChild(_getTextWidthDiv);
    return _getTextWidthDiv;
}
function getTextWidth(text: string) {
    var div = _getTextWidthDiv ?? (setUpDiv());
    div.innerText = text
    return div.clientWidth;
}

export type { Dict };
export { getTextWidth };

