
import ReactDOM from "react-dom";
import React from "react";
import ColumnComponent from "@components/ColumComponent";

class CustomColumns {

  static get toolbox() {
    return {
      title: "2 columns",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-square" viewBox="0 0 16 16"><path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/><path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/></svg>'
    }
  }

  constructor({ data,config, api }) {
    this.api = api;    
    this.data = data || { 
      content: []
    }    

    this.nodes = {
      holder: null
    };
  }

  render() {
    const rootNode = document.createElement("div");   
    rootNode.contentEditable = true
    this.nodes.holder = rootNode;

    const onObjChange = (data) => {
      this.data = data
    };

    render(
      <ColumnComponent
        api={this.api}
        data={this.data}
        onObjChange={onObjChange}
      />,
      document.getElementById("root1")
    );

    return this.nodes.holder;
  }

  save() {
    return this.data
  }
}

export default CustomColumns;