import React,{Component} from "react";
import './index.css'
export default class Footer extends Component{
    handleCheckAll=(event)=>{
        this.props.selectedChange(event.target.checked)
    }
    handleClearAllDone = ()=>{
        if(window.confirm('确定清除吗？')){
            this.props.clearAllDone()
        }
    }
    render(){
        const {todos} = this.props
        const finished = todos.reduce((pre,cur)=>{
            pre.push(cur.done)
            return pre
        },[]).filter((item)=>item===true)
        // console.log(finished)
        return(
            <div className="todo-footer">
                <label>
                    <input type="checkbox"  onChange={this.handleCheckAll}/>
                </label>
                <span>
                    <span>
                        已完成：{finished.length}
                    </span>&nbsp;/&nbsp;全部：{todos.length}
                </span>
                <button className="btn btn-danger" onClick={this.handleClearAllDone}>清除已完成任务</button>

            </div>
        )
    }

}