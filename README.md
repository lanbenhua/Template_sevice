### **# bot端**
##### tpl-data：

###### 1.接口：
    IP + PORT(default:3000) + '/tpl-data'
    例：http://192.168.10.39:3000/tpl-data
###### 2.从bot端发出的数据：
   **expense_form 模版页面数据**：
    {
        "uid":"(用户ID)",  // required
        "data": { // 页面相关的初始化数据
            "title": "（页面标题）", // required
            "validate_plugins": true, // required
            "type_options": "(报销类型数据)", // required
            "approve_admin":true,  // not required,审批人、抄送人是否可编辑
            "approvers":[  // 审批人列表数据
                {
                    "avatar":"(头像url)",
                    "displayName":"(用户名)"
                }
            ],
            "copysenders":[  // 抄送人列表数据
                {
                    "avatar":"(头像url)",
                    "displayName":"(用户名)"
                }
            ]
        }
    }
###### 3. tplserver返回数据： 
    {
        data_id: "(data_id)",
        "**": **
    }
###### 4. 拼接URL：
    IP + PORT + '/biz-flow/(:模版名称)?data_id=(:data_id)'
    例：http://192.168.10.39:3000/biz-flow/expense_form?data_id=59ad320ceb9cd920e410c887