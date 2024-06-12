export function nestedComment(data, parentId = null) {
    return data?.reduce((r, e) => {
      let obj = Object?.assign({}, e)
      if (parentId == e?.parentId) {
        let children = nestedComment(data, e?.commentId)
        if (children.length) obj.children = children
        r.push(obj)
      }
      return r;
    }, [])
  }

  export const moveArr = (arr1) => {
    let array = arr1[0]
    let newMessage = []
    for (let index = 0; index < arr1.length; index++) {
        if(arr1[index]?.author?.userId === array?.author?.userId){
           if(index !== 0){
            arr1?.splice(index, 1)
             newMessage = arr1
           }
        }else{
            array = arr1[index]
        }
    }
    return newMessage;
}