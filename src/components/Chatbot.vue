<template>
  <div class="chat-gpt">
    <div class="chat-gpt-left" style="display: none;">
      <div class="item_btn" @click="createNewChat">新建聊天</div>
      <!-- 聊天列表 -->
      <div class="item_c_list">
        <div class="item_c" :class="{ active: activeIndex == index }" v-for="(chat, index) in chatList" :key="index" @click="selectChat(index)">
          <p><i class="el-icon-chat-line-round"></i>{{ chat.title }}</p>
          <p>
            <!-- <i class="el-icon-edit" @click.stop="editChat(chat)"></i> -->
            <i class="el-icon-delete" @click.stop="deleteChat(index)"></i>
          </p>
        </div>
      </div>
    </div>

    <div class="chat-gpt-right" v-if="currentChat !== null">
      <!-- <div class="input-area-tit">我是美华基于人工智能技术的智能客服机器人，可以进行自然语言交互，提供保险智能问答、自动学习、自动聊天等功能。</div> -->
      <div class="chat-area" ref="scrollContainer">
        <div v-for="(message, index) in currentChat.messages" :key="index" class="message">
          <!-- 根据消息发送者动态添加样式 -->
          <div v-if="message.sender === 'machine'" class="message-bubble machine-response">
            <div class="c_name">
              <img src="../static/images/AIrobot.png" alt="">
            </div>
            <div class="c_cont" v-html="message.text"> </div>
          </div>
          <div v-else-if="message.sender === 'me'" class="message-bubble user-message">
            <div class="c_cont">{{ message.text }}</div>
            <div class="c_name">
              <img src="../static/images/user.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="input-area">
        <!-- :disabled="isRobotReplying" -->
        <el-input type="textarea" v-model="formData.inputMessage" placeholder="你好，我是你的专属保险销售话术助手，你可以把客户的问题发给我，比如“你好，我想咨询一下重疾险”  （按Shift + Enter 换行）" @keyup.enter.native="handleKeyDown"></el-input>

        <div class="common-select">
          <div class="search-box-right">
            <div style="display: flex;">
              <el-button type="primary" class="search-btn searchLeft  sendMsg" @click="sendMessage" :disabled="isRobotReplying">发送</el-button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="chat-gpt-right" v-else>
      <div>
        <p>请选择一个聊天</p>
      </div>
    </div>
  </div>
</template>
<script src="https://insure.meihualife.com//js/chatRecord/marked.min.js"></script>
<script>
import marked from "../static/js/marked.min.js"
import { getData, my_url, crm_url } from "../static/js/ajax.js";
import { fetchEventSource } from '@microsoft/fetch-event-source';
// import chatData from "./chatData.json";
export default {
  name: "Chatbot",
  data() {
    return {
      optimizedCode: false,
      formData: {
        inputMessage: "",
      },
      sessionid: '',
      messages: [],
      chatList: [], // 存储聊天列表
      currentChat: null, // 存储当前选中的聊天
      activeIndex: null,
      isRobotReplying: true, // 添加 isRobotReplying 属性
    };
  },
  mounted() {
    this.createNewChat();

    // this.connectToSSE();

  },
  methods: {

    connectToSSE(machineResponseObj, userMessage) {

      getData("post", my_url + "/crm/auth/getToken.do", (data) => {
        // 定义参数
        const params = new URLSearchParams({
          content: userMessage,
          cgid: '220e2aa2fe1d11ef8aaf00163e1ccaeb',
          token: data.token,
          sessionid: this.sessionid
        });



        // this.eventSource = new EventSource(`https://mhnew.meihualife.com/api/test/qatest`);
        this.eventSource = new EventSource(`https://mhnew.meihualife.com/api/knowledge/quetionAndAnswer?${params.toString()}`);
        this.eventSource.onmessage = (event) => {

          const data = JSON.parse(event.data) //将字符串转换成json格式
          console.log(data.content)
          machineResponseObj.text += data.content;


          this.$nextTick(() => {
            this.scrollToBottom()
          });
          this.delay(100); // 添加延迟以逐字显示
          if (data.isEnd == 'Y') { //判断结束标识
            machineResponseObj.text = marked(machineResponseObj.text)
            this.sessionid = data.sessionid
            this.eventSource.close();

            // 恢复发送按钮和输入数据
            this.isRobotReplying = false;
          } else {
            // this.eventSource.close();
          }
        };
        this.eventSource.onerror = (error) => {
          if (this.eventSource.readyState === EventSource.CLOSED) {
            console.log('Connection to server closed');
          } else {
            console.error('Error occurred:', error);
          }
        };



      })
    },

    async sendMessage() {
      const userMessage = this.formData.inputMessage;

      if (userMessage.trim() === '') {
        this.$message({
          showClose: true,
          message: "请输入要问的问题",
          duration: 2000,
          type: 'error'
        });
        return
      }


      const currentChatNow = this.currentChat; // 获取当前选中的聊天
      // 设置标题，您可以根据需要更改
      currentChatNow.title = userMessage;
      // 禁用发送按钮和输入数据
      this.isRobotReplying = true;
      console.log(this.isRobotReplying)
      console.log(this.isRobotReplying)
      // 用户消息
      const userMessageObj = { sender: 'me', text: userMessage };
      currentChatNow.messages.push(userMessageObj);


      const machineResponseObj = { sender: "machine", text: "" };
      currentChatNow.messages.push(machineResponseObj);
      this.scrollToBottom()


      this.connectToSSE(machineResponseObj, userMessage)
      // this.getSSE(machineResponseObj, userMessage)
      // this.getSSEDate(machineResponseObj, userMessage)


      this.formData.inputMessage = "";

    },
    handleKeyDown(event) {
      console.log(event)
      if (!event.shiftKey) {
        event.preventDefault(); // 阻止默认行为
        if (!this.isRobotReplying) {
          this.sendMessage(); // 发送消息
        } else {
          this.$message({
            showClose: true,
            message: "上一个对话完成后才可发送",
            duration: 3000,
            type: 'error'
          });
        }



      }
    },
    // 创建新聊天
    createNewChat() {
      const newChat = {
        title: "New Chat", // 聊天标题
        messages: [], // 聊天消息
      };
      this.chatList.push(newChat);
      this.formData.inputMessage = "";
      // 恢复发送按钮和输入数据
      this.isRobotReplying = false;
      this.selectChat(this.chatList.length - 1); // 选择新创建的聊天
    },
    // 选择聊天
    selectChat(index) {
      this.currentChat = this.chatList[index];
      this.activeIndex = index;
    },
    // 编辑聊天
    // editChat() {
    //   // 处理编辑聊天的逻辑
    //   console.log(1);
    // },
    // // 删除聊天
    // deleteChat(index) {
    //   this.chatList.splice(index, 1);
    //   if (this.chatList.length > 0) {
    //     this.selectChat(0); // 选择第一个聊天
    //     this.activeIndex = 0;
    //   } else {
    //     this.currentChat = null; // 如果没有聊天了，清空当前聊天
    //     this.activeIndex = null;
    //   }
    // },



    // 添加延迟函数
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    scrollToBottom() {
      const scrollContainer = this.$refs.scrollContainer;
      console.log(scrollContainer)
      if (scrollContainer) {
        this.$nextTick(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight; // 滚动到最底部
          // container.scrollTop = 8000; // 滚动到最底部
        });

      }
    },


    beforeDestroy() {
      if (this.eventSource) {
        this.eventSource.close();
      }
    },

  },
};
</script>
<style lang="scss" scoped>
.chat-gpt {
  width: 100%;
  height: calc(100% - 0.4rem);
  overflow: hidden;
  display: flex;
  font-size: 0.14rem;

  /* 逐字显示动画 */
  .message-bubble {
    overflow: hidden;
  }

  .message-bubble[data-typing]::after {
    content: "";
    animation: typing 0.1s steps(1) infinite;
  }

  @keyframes typing {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }

  .machine-response {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .user-message {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .user-message .c_cont {
    background: #eff6ff;
  }

  .chat-gpt-left {
    width: 20.8333vw;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.0417vw 1.5625vw;
    min-width: 200px;

    .item_btn {
      width: 100%;
      margin: 0.5208vw 0;
      background-color: #18a058;
      color: #fff;
      height: 2.9167vw;
      border-radius: 0.4167vw;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .item_c_list {
      width: 100%;
      flex: 1;
      width: 100%;
      display: flex;
      flex-direction: column;

      .item_c {
        width: 100%;
        display: flex;
        align-items: center;
        border: 1px solid #ccc;
        height: 2.9167vw;
        justify-content: space-between;
        color: #18a058;
        border-radius: 0.3125vw;
        margin: 0 0 0.5208vw 0;
        cursor: pointer;

        p {
          display: flex;
          align-items: center;

          &:nth-child(1) {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }

        i {
          margin: 0 0.2604vw;
          font-size: 1.25vw;
          color: #18a058;
          cursor: pointer;
        }

        &.active {
          border: 1px solid #18a058;
          background: rgba($color: #18a058, $alpha: 0.1);
        }
      }
    }
  }

  .chat-gpt-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    // padding: 0.5208vw;
    .input-area-tit {
      width: 100%;
      font-size: 1.0417vw;
      padding: 0 0 1.5625vw 0;
      color: #1d2f6c;
    }
    .chat-area {
      // flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      height: auto;
      max-height: 3.5rem;
      // min-height: 6.5rem;
      // border: 1px solid red;
      overflow: auto;
      .message {
        margin-top: 0.2rem;
        .message-bubble {
          // margin-bottom:1rem;
        }

        .c_name {
          // width: 3.25vw;
          // height: 3.25vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #18a058;
          border-radius: 50%;
          color: #fff;
          font-size: 0.8333vw;
          font-weight: 600;
          margin: 0rem 0.1rem;
        }

        .c_cont {
          // flex: 1;
          border-radius: 0.3125vw;
          background-color: #efefef;
          // min-height: 4.1667vw;
          padding: 0.1rem;
          max-width: calc(100% - 3.625vw);
          // display: flex;
          // align-items: center;
          // text-align: left;
        }
      }
    }

    .input-area {
      width: 100%;
      // display: flex;
      // align-items: flex-end;
      // height: 1.8rem;
      background: #fff;

      // padding-bottom: 0.5rem;

      .el-textarea {
        height: 100% !important;
        display: flex;
        margin-left: 5%;
        width: 90%;
        margin-bottom: 5px;
        .el-textarea__inner {
          height: 100% !important;
        }
      }

      .el-button {
        // margin: 0 0.5208vw;
      }
    }
  }
}

.vue-codemirror {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.CodeMirror {
  height: auto !important;
  flex: 1;
}

.CodeMirror-sizer {
  margin-bottom: 0 !important;
}

.sendMsg {
  display: block;
  width: 100%;
  border-radius: 3px;
  line-height: 0.3rem;
  text-align: center;

  background: #dc220d;
  font-size: 0.14rem;
  color: #fff;
  border: 0;
  margin: 0;
  padding: 0;
}

.sendMsg:hover {
  background: #dc220d;
  border: 0;
  color: #fff;
}
</style>



<style  scoped>
.chat-gpt .chat-gpt-right .input-area {
  width: 100%;
  position: absolute;
  bottom: 10px;
}
.chat-gpt .chat-gpt-right .input-area .el-textarea {
  /* margin-left: 0; */
}
.c_name img {
  width: 20px;
  height: 20px;
}

.search-box-right {
  width: 90%;
  margin-left: 5%;
}
</style>



 