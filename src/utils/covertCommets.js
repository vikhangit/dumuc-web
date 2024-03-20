export function nestedComment(data, parentId = null) {
    return data.reduce((r, e) => {
      let obj = Object.assign({}, e)
      if (parentId == e.parentId) {
        let children = nestedComment(data, e.commentId)
        if (children.length) obj.children = children
        r.push(obj)
      }
      return r;
    }, [])
  }