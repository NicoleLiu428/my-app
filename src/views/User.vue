<template>
  <div class="namage">
    <!-- 信息提示框 -->
    <el-alert
      title="用戶信息提交成功"
      type="success"
      show-icon
      v-show="isShowSuccess">
    </el-alert>
    <el-alert
      title="用戶信息提交失敗"
      type="error"
      show-icon
      v-show="isShowError">
    </el-alert>
    <el-alert
      title="用戶信息刪除成功"
      type="success"
      show-icon
      v-show="isShowDelete">
    </el-alert>
    <div class="namage-header">
      <!-- 新增按鈕 -->
      <el-button type="primary" @click="dialogVisible = true" style="margin: 20px 0">+新增</el-button>
      <!-- 搜索框 -->
      <el-form :inline="true" :model="userform" class="demo-form-inline">
        <el-form-item label="用戶名">
          <el-input v-model.trim="userform.name" placeholder="請輸入用戶姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(userform.name)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- form表單 -->
    <el-dialog
      title="新增用戶"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="HandleClose">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年齡" prop="age">
          <el-input v-model="ruleForm.age" placeholder="请输入年齡"></el-input>
        </el-form-item>
        <el-form-item label="性別" required prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" required prop="birth">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birth" ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="ruleForm.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm',ruleForm)">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')" :disabled="disabled">重置</el-button>
        <el-button @click="HandleClose">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <!-- 用戶列表 -->
    <el-table
       height="75%"
      :data="tableDataView"
      border
      stripe
      style="width: 100%;"
      >
      <el-table-column
        fixed
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="age"
        label="年齡">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性別">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="出生日期">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">編輯</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分頁 -->
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="tableData.length?tableData.length:0"
        @current-change="handlePage"
        v-show="isShowPage">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleDelete"
      width="30%"
      :before-close="HandleDeleteClose">
      <span>確認要刪除嗎?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="HandleDeleteClose">取 消</el-button>
        <el-button type="primary" @click="HandleDeleteDO">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { nanoid } from "nanoid"
export default {
  name: 'Uesr',
  data() {
    return {
      isShowSuccess:false,
      isShowError:false,
      isShowDelete:false,
      disabled:false,
      dialogVisible:false,
      dialogVisibleDelete:false,
      isDelete:false,
      isShowPage:true,
      rowId:'',
      page:1,
      userform:{
        id:'',
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr:''
      },
      // operateFomLabel:[{
      //   model: 'name',
      //   label: '姓名',
      //   type:'input'
      // },
      // {
      // model: 'age',
      // label: '年齡',
      // type:'input'
      // },
      // {
      // model: 'sex',
      // label: '性別',
      //   type: 'select',
      //   opts: [
      //     {
      //       label: '男',
      //       value:1
      //     },
      //     {
      //       label: '女',
      //       value:0
      //     }
      //   ]
      // },
      // {
      //   model: 'birth',
      //   label: '出生日期',
      //   type: 'date',
      // },
      // {
      //   model: 'addr',
      //   label: '地址',
      //   type: 'input',
      // }
      // ],
      ruleForm: {
        id:'',
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr:''
      },
      rules: {
          name: [
            { required: true, message: '请输入姓名' },
            // { min: 1, max: 20, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年齡' },
            { min: 1, max: 3, message: '长度在 1 到 3 个字符' }
          ],
          sex: [
            { required: true, message: '请選擇' },
          ],
          birth: [
            { type: 'date', required: true, message: '选择日期'}
          ],
          addr: [
            { required: true, message: '请输入地址'},
          ]
      },
      tableData: [
        // {
        //   name: 'nicole',
        //   age: '33',
        //   sex: '女',
        //   birth: '1991-01-23',
        //   addr: '桃園市中壢區',
        // },
        // {
        //   name: 'simon',
        //   age: '30',
        //   sex: '男',
        //   birth: '1994-10-08',
        //   addr: '桃園市桃園區',
        // },
        // {
        //   name: 'caroline',
        //   age: '29',
        //   sex: '女',
        //   birth: '1995-09-05',
        //   addr: '台北市大安區',
        // },
        // {
        //   name: 'tina',
        //   age: '34',
        //   sex: '女',
        //   birth: '1990-05-23',
        //   addr: '新北市五股區',
        // },
        // {
        //   name: 'lucky',
        //   age: '35',
        //   sex: '男',
        //   birth: '1989-06-30',
        //   addr: '桃園市龍潭區',
        // }
      ],
      tableDataView:[]    
  }
  },
  methods: {
    submitForm(formName,ruleForm) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let year = ruleForm.birth.getFullYear()
          let month =String(ruleForm.birth.getMonth() + 1) 
          month = month.length===2?month:('0' + month)
          let day = String(ruleForm.birth.getDate())
          day = day.length === 2 ? day : ('0' + day)
          const modelType = this.tableData.findIndex(item => item.id === ruleForm.id)
          if (modelType === -1) {
            this.tableData.push({
            id:nanoid(),
            name: ruleForm.name,
            age: ruleForm.age,
            sex: ruleForm.sex===1?'男':'女',
            birth: year + '-' + month + '-' + day,
            addr: ruleForm.addr,
          })
          } else {
            this.tableData.splice(modelType,1,{
              id:ruleForm.id,
              name: ruleForm.name,
              age: ruleForm.age,
              sex: ruleForm.sex===1?'男':'女',
              birth: year + '-' + month + '-' + day,
              addr: ruleForm.addr,
            })
            this.disabled = false
          }
          localStorage.setItem('tableData',JSON.stringify(this.tableData))
          this.isShowSuccess=true
          setTimeout(()=>this.isShowSuccess=false,3000)
          //重置
          this.$refs[formName].resetFields();
          //關閉彈窗
          this.dialogVisible = false
        } else {
          this.isShowError=true
          setTimeout(()=>this.isShowError=false,3000)
          this.$refs[formName].resetFields();
          this.dialogVisible = false
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    HandleClose() { 
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
      this.disabled = false      
    },
    handleEdit(index, row) {
      this.disabled = true
      // console.log(index, row);
      this.ruleForm = JSON.parse(JSON.stringify(row))
      this.ruleForm.birth = new Date(String(row.birth))
      this.dialogVisible = true
    },
    HandleDeleteClose(){
      this.dialogVisibleDelete = false
    },
    HandleDeleteDO(){
      this.tableData = JSON.parse(localStorage.getItem('tableData'))
      this.tableData = this.tableData.filter(item => item.id !== this.rowId)
      localStorage.setItem('tableData',JSON.stringify(this.tableData))
      this.rowId = ''
      this.dialogVisibleDelete = false
      this.isShowDelete=true
      setTimeout(()=>this.isShowDelete=false,3000)
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.dialogVisibleDelete = true
      this.rowId = row.id
    },
    handlePage(val){
      this.page = val
      this.tableDataView = this.tableData.filter((item,index)=>index < val * 10 && index >= (val-1) * 10) 
    },
    onSubmit(userName){
      if(userName){
        this.isShowPage = false
        this.tableDataView = this.tableData.filter(item=>item.name === userName)
      }else{
        this.isShowPage = true
        this.tableDataView = this.tableData.filter((item,index)=>index < this.page * 10 && index >= (this.page-1) * 10) 
      }
    }
    },
  mounted() {
      this.tableData = JSON.parse(localStorage.getItem('tableData'))||[
        {
          id:nanoid(),
          name: 'nicole',
          age: '33',
          sex: '女',
          birth: '1991-01-23',
          addr: '桃園市中壢區',
        },
        {
          id:nanoid(),
          name: 'simon',
          age: '30',
          sex: '男',
          birth: '1994-10-08',
          addr: '桃園市桃園區',
        },
        {
          id:nanoid(),
          name: 'caroline',
          age: '29',
          sex: '女',
          birth: '1995-09-05',
          addr: '台北市大安區',
        },
        {
          id:nanoid(),
          name: 'tina',
          age: '34',
          sex: '女',
          birth: '1990-05-23',
          addr: '新北市五股區',
        },
        {
          id:nanoid(),
          name: 'candy',
          age: '40',
          sex: '女',
          birth: '1984-09-30',
          addr: '桃園市平鎮區',
        },
        {
          id:nanoid(),
          name: 'lucky',
          age: '35',
          sex: '男',
          birth: '1989-06-30',
          addr: '桃園市龍潭區',
        },
        {
          id:nanoid(),
          name: 'Abbie',
          age: '33',
          sex: '女',
          birth: '1991-01-23',
          addr: '桃園市中壢區',
        },
        {
          id:nanoid(),
          name: 'Alice',
          age: '30',
          sex: '男',
          birth: '1994-10-08',
          addr: '桃園市桃園區',
        },
        {
          id:nanoid(),
          name: 'james',
          age: '29',
          sex: '女',
          birth: '1995-09-05',
          addr: '台北市大安區',
        },
        {
          id:nanoid(),
          name: 'eva',
          age: '34',
          sex: '女',
          birth: '1990-05-23',
          addr: '新北市五股區',
        },
        {
          id:nanoid(),
          name: 'apple',
          age: '40',
          sex: '女',
          birth: '1984-09-30',
          addr: '桃園市平鎮區',
        },
        {
          id:nanoid(),
          name: 'vicky',
          age: '35',
          sex: '男',
          birth: '1989-06-30',
          addr: '桃園市龍潭區',
        },
        {
          id:nanoid(),
          name: 'dela',
          age: '33',
          sex: '女',
          birth: '1991-01-23',
          addr: '桃園市中壢區',
        },
        {
          id:nanoid(),
          name: 'alin',
          age: '30',
          sex: '男',
          birth: '1994-10-08',
          addr: '桃園市桃園區',
        },
        {
          id:nanoid(),
          name: 'bess',
          age: '29',
          sex: '女',
          birth: '1995-09-05',
          addr: '台北市大安區',
        },
        {
          id:nanoid(),
          name: 'betty',
          age: '34',
          sex: '女',
          birth: '1990-05-23',
          addr: '新北市五股區',
        },
        {
          id:nanoid(),
          name: 'cathy',
          age: '40',
          sex: '女',
          birth: '1984-09-30',
          addr: '桃園市平鎮區',
        },
        {
          id:nanoid(),
          name: 'dora',
          age: '35',
          sex: '男',
          birth: '1989-06-30',
          addr: '桃園市龍潭區',
        },
        {
          id:nanoid(),
          name: 'fay',
          age: '33',
          sex: '女',
          birth: '1991-01-23',
          addr: '桃園市中壢區',
        },
        {
          id:nanoid(),
          name: 'grace',
          age: '30',
          sex: '男',
          birth: '1994-10-08',
          addr: '桃園市桃園區',
        },
        {
          id:nanoid(),
          name: 'hedy',
          age: '29',
          sex: '女',
          birth: '1995-09-05',
          addr: '台北市大安區',
        },
        {
          id:nanoid(),
          name: 'jade',
          age: '34',
          sex: '女',
          birth: '1990-05-23',
          addr: '新北市五股區',
        },
        {
          id:nanoid(),
          name: 'jojo',
          age: '40',
          sex: '女',
          birth: '1984-09-30',
          addr: '桃園市平鎮區',
        },
        {
          id:nanoid(),
          name: 'kay',
          age: '35',
          sex: '男',
          birth: '1989-06-30',
          addr: '桃園市龍潭區',
        },
        {
          id:nanoid(),
          name: 'lara',
          age: '33',
          sex: '女',
          birth: '1991-01-23',
          addr: '桃園市中壢區',
        },
        {
          id:nanoid(),
          name: 'kitty',
          age: '30',
          sex: '男',
          birth: '1994-10-08',
          addr: '桃園市桃園區',
        },
        {
          id:nanoid(),
          name: 'lee',
          age: '29',
          sex: '女',
          birth: '1995-09-05',
          addr: '台北市大安區',
        },
        {
          id:nanoid(),
          name: 'lena',
          age: '34',
          sex: '女',
          birth: '1990-05-23',
          addr: '新北市五股區',
        },
        {
          id:nanoid(),
          name: 'linda',
          age: '40',
          sex: '女',
          birth: '1984-09-30',
          addr: '桃園市平鎮區',
        },
        {
          id:nanoid(),
          name: 'liz',
          age: '35',
          sex: '男',
          birth: '1989-06-30',
          addr: '桃園市龍潭區',
      }
    ]
      this.tableDataView = this.tableData.filter((item,index)=>index < 10) 
    },
    watch:{
      tableData:{
        deep:true,
        handler(newVla){
          if(Math.ceil(newVla.length/10)<this.page){
            this.page-=1
          }
          this.tableDataView = newVla.filter((item,index)=>index < this.page * 10 && index >= (this.page-1) * 10) 
        }
      }
    }
}
</script>

<style lang="less" scoped>
.namage {
  position: relative;
  height: 100%;
  .block {
  position: absolute;
  margin-top: 10px;
  right: 20px;
  }
  .namage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
}

</style>