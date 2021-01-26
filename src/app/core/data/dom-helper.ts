export class DomHelper {
  public static isDescendant(parent: Element, child: Element): boolean {
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
