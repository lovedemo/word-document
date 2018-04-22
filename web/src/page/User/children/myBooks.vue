<template>
  <div>
    <y-shelf title="我的书籍">
      <div slot="content">
        <div class="add-btn">
          <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">添加</el-button>
        </div>
        <div class='books-table' style="text-align: center">
          <el-table
            :data="tableData"
            style="width: 100%">

            <el-table-column
              label="图片"
             >
              <template slot-scope="scope">
                <img class="bookImg" v-if="scope.row.imgList" :src="scope.row.imgList">
              </template>
            </el-table-column>
            <el-table-column
              prop="bookISBN"
              label="书籍ISBN"
            >
            </el-table-column>
            <el-table-column
              prop="bookName"
              label="书籍名"
              >
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
            </el-table-column>
            <el-table-column
              prop="num"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="info"
              label="书籍描述">
            </el-table-column>

          </el-table>
        </div>

        <el-dialog title="添加书籍" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="书籍名" :label-width="formLabelWidth" prop="bookName">
              <el-input v-model="form.bookName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="ISBN" :label-width="formLabelWidth" prop="bookISBN">
              <el-input v-model="form.bookISBN" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="书籍描述" :label-width="formLabelWidth" >
              <el-input v-model="form.info" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
              <el-input v-model="form.price" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="数量" :label-width="formLabelWidth" prop="num">
              <el-input v-model="form.num" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="上传图片" :label-width="formLabelWidth">
              <el-upload
                action="/users/bookImg"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-success="handlePictureSuccess"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog style="z-index:200" :visible.sync="dialogImgVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitBook()">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </y-shelf>
  </div>
</template>
<script>
  import YShelf from '/components/shelf'
  import {addBook,getMybook} from '/api/books'
  export default {
    components: {
      YShelf
    },
    data() {
      return {
        activeName: 'second',
        dialogFormVisible: false,
        formLabelWidth: '80px',
        tableData:[],
        form: {
          bookName:'',
          bookISBN:'',
          num:'',
          info:'',
          price:'',

        },
        rules: {
          bookName: [
            { required: true, message: '请输入书籍名', trigger: 'blur' },
          ],
          bookISBN: [
            { required: true, message: '请输入书籍ISBN', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请输入价格', trigger: 'change' }
          ],
          num: [
            { required: true, message: '请输入数量', trigger: 'change' }
          ],

        },
        dialogImageUrl: '',
        dialogImgVisible: false,
        imgList:''
      }
    },
    mounted(){
      this.initBook();
    },
    methods: {

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImgVisible = true;
      },
      handlePictureSuccess(res, file) {
        this.imgList=res.url;
       console.log(res,file)
      },

      initBook(){
        getMybook().then(res=>{
          console.log(res);
          this.tableData=res;
        })
      },
      submitBook(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            //填写正确，在这里提交
            let postdata=this.form;
            console.log(postdata);
            postdata.imgList=this.imgList;
            addBook(postdata).then(res=>{
              console.log(res.status)
              if(res.status=='0'){
                //成功上传
                this.initBook();
                this.form= {
                  bookName:'',
                    bookISBN:'',
                    num:'',
                    info:'',
                    price:'',

                },
                this.dialogFormVisible=false;
              }
            })
          } else {
            //填写错误
            return false;
          }
        });




      }
    }

  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .content {

    .add-btn {
      margin-top: 50px;
      margin-left: 50px;
    }
    .books-table {
      margin: 50px;
    }
    .bookImg{
      width: 170px;
      height: 170px;
    }
  }
</style>
