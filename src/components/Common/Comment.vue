<template>
  <!-- <div class="template"> -->
  <div>
    <div class="photo-bottom">
      <ul>
        <li class="photo-comment">
          <div>
            <span>提交评论</span>
            <span><a>返回</a></span>
          </div>
        </li>
        <li class="text-comment">
          <textarea ref="textarea" v-model="newComment"></textarea>
        </li>
        <li>
          <mt-button type="primary" size="large" @click="sendComment">
            发表评论
          </mt-button>
        </li>
        <li class="photo-comment">
          <div>
            <span>评论列表</span>
            <span>{{ msgs.length }}条评论</span>
          </div>
        </li>
      </ul>
      <ul class="comment-list">
        <li v-for="(msg,index) in msgs" :key="index">
          <span>
            {{ msg.user_name }}: {{ msg.content }}
          </span>
          <span style="float: right">
            {{ msg.add_time | relativeTime('')}}
          </span>
        </li>
      </ul>
      <mt-button plain type="danger" size="large" @click="loadMore">加载更多</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: ['cid'],
  data () {
    return {
      msgs: [], // 消息数据
      page: 1, // 组件内控制页码
      newComment: '', // 新的消息
      textareaHeight: ''
    }
  },
  created () {
    this.page = this.$route.query.page || '1'
    this.firstLoad()
  },
  methods: {
    // 根据页码发送请求
    firstLoad () {
      this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          if (res.data.message.length === 0) {
            // this.$toast('没有数据了')
          }
          this.msgs = res.data.message
          this.page++
        })
        .catch(err => console.log('评论获取失败', err))
    },
    // 点击按钮调用
    loadMore (page) {
      this.$axios.get(`getcomments/${this.cid}?pageindex=${this.page}`)
        .then(res => {
          if (res.data.message.length === 0) {
            this.$toast('没有数据了')
          }
          if (page) {
            this.msgs = this.msgs.concat(res.data.message)
          } else {
            this.msgs = res.data.message
          }
          this.page++
        })
        .catch(err => console.log('评论获取失败', err))
    },
    sendComment () {
      // 发表前判断是否为空
      if (this.newComment.trim() === '') {
        return this.$toast('评论信息不能为空')
      }
      // 获取评论信息 this.newComment
      this.$axios.post('postcomment/' + this.cid, 'content=' + this.newComment)
        .then(res => {
          this.newComment = ''
          this.page = 1
          this.loadMore()
        })
    }
  }
}
</script>

<style scoped>
.photo-comment > div span:nth-child(2) {
  float: right;
}
.photo-comment {
  height: 30px;
  border-bottom: 1px solid rgba(0,0,0,0.4);
  line-height: 30px;
  margin-bottom: 5px;
}
.text-comment {
  padding: 5px 0;
  text-align: center;
}
.text-comment textarea {
  font-size: 18px;
  margin-bottom: 5px;
  width: 95%;
  height: 84px;
  border: 1px solid #000000;
  resize: none;
  overflow: hidden;
}
.comment-list li {
  border-bottom: 1px solid rgba(0,0,0,0.2);
  padding-bottom: 5px;
  margin-bottom: 5px;
  padding-left: 5px;
}
li {
  list-style: none;
}
ul {
  margin: 0;
  padding: 0;
}
</style>
