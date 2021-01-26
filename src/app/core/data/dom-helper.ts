export class DomHelper {
  public static isDescendant(parent: Element, child: Element): boolean {
    if (!child) {
      return false;
    }
    var node = child.parentNode;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
}
