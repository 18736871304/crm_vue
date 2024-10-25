<template>
  <div class="header-callbox header-skytech" ref="callbox">
    <div class="skytech-softphone-head">
      <!-- <div class="skytech-softphone-text" @click="showLoginDialpad = true" v-if="isLoginDialpad">
            <div class="icon" style="margin-top:2px;">
                <Icon type="ios-contact" />
            </div>
            <div class="text">登录</div>
        </div> -->
      <div
        class="skytech-softphone-text"
        @click="handleAgentBarBtnClick('zhedie')"
        v-if="zhedie"
      >
        <div class="soft-function">
          <div class="icon" style="margin-top: 2px">
            <i class="kfontplus" style="font-size: 20px"><</i>
          </div>
          <div class="text">展开</div>
        </div>
      </div>
      <div class="skytech-softphone" v-else-if="!zhedie">
        <div
          class="status"
          :class="{ disable: statusDisable }"
          style="width: 150px"
          v-show="
            phoneTypeStr !== 'double' &&
            phoneTypeStr !== 'zkdouble' &&
            phoneTypeStr !== 'fdouble'
          "
        >
          <div class="text">
            坐席状态: <span class="state">{{ agentState }}</span>
          </div>
          <div class="text">
            状态时长: <span class="number">{{ timerString }}</span>
          </div>
        </div>
        <!-- <div style="width:100px;float:left;height:46px;margin-top:5px;" v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'">
              <i-input v-model="agentNo" style="width: 100px;margin-top: 2px;" size="large" placeholder="坐席分机号"></i-input>
          </div> -->
        <!-- <div class="soft-function" id="skytech_account" :class="{disabled:loginDisable}" v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'">
              <div v-show="!isLogin" class="soft-function login" data-toggle="soft-function" @click="handleAgentBarBtnClick('login')">
                  <div class="icon"><i class="kfont">&#xe954;</i></div>
                  <div class="text">登录</div>
              </div>
              <div v-show="isLogin" class="soft-function logout" data-toggle="soft-function" @click="handleAgentBarBtnClick('logout')">
                  <div class="icon"><i class="kfont">&#xe622;</i></div>
                  <div class="text">登出</div>
              </div>
          </div> -->
        <div
          v-show="
            phoneTypeStr !== 'double' &&
            phoneTypeStr !== 'zkdouble' &&
            phoneTypeStr !== 'fdouble'
          "
          class="soft-function"
          :class="{ disabled: readyDisable }"
          id="softphone-ready"
          data-toggle="soft-function"
          data-action="ready"
          @click="handleAgentBarBtnClick('ready')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfontplus">&#xec2e;</i>
          </div>
          <div class="text">就绪</div>
        </div>
        <div
          v-show="
            phoneTypeStr !== 'double' &&
            phoneTypeStr !== 'zkdouble' &&
            phoneTypeStr !== 'fdouble'
          "
          class="soft-function"
          :class="{ disabled: busyDisable }"
          id="softphone-busy"
          data-toggle="soft-function"
          data-action="busy"
          @click="handleAgentBarBtnClick('busy')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfontplus">&#xe780;</i>
          </div>
          <div class="text">置忙</div>
        </div>
        <div
          v-show="
            phoneTypeStr !== 'double' &&
            phoneTypeStr !== 'zkdouble' &&
            phoneTypeStr !== 'fdouble'
          "
          class="soft-function"
          :class="{ disabled: restDisable }"
          id="softphone-rest"
          data-toggle="soft-function"
          data-action="rest"
          @click="handleAgentBarBtnClick('rest')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfontplus">&#xe6e2;</i>
          </div>
          <div class="text">小休</div>
        </div>
        <div
          v-show="
            phoneTypeStr !== 'double' &&
            phoneTypeStr !== 'zkdouble' &&
            phoneTypeStr !== 'fdouble'
          "
          class="soft-function"
          :class="{ disabled: progressDisable }"
          id="softphone-progress"
          data-toggle="soft-function"
          data-action="progress"
          @click="handleAgentBarBtnClick('progress')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfontplus">&#xe616;</i>
          </div>
          <div class="text">后处理</div>
        </div>
        <div
          :style="{
            marginLeft:
              phoneTypeStr === 'double' ||
              phoneTypeStr === 'zkdouble' ||
              phoneTypeStr === 'fdouble'
                ? '50%'
                : '0',
          }"
          class="soft-function diafunction"
          :class="{ disabled: makeCallDisable }"
          id="softphone-makecall"
          @click="handleAgentBarBtnClick('makeCall')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfont">&#xe627;</i>
          </div>
          <div class="text">拨打</div>
        </div>
        <div
          class="soft-function"
          :class="{ disabled: hangupDisable }"
          id="softphone-hungup"
          data-toggle="soft-function"
          data-action="hungup"
          @click="handleAgentBarBtnClick('hangup')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfont">&#xe604;</i>
          </div>
          <div class="text">挂断</div>
        </div>
        <div
          v-show="
            phoneTypeStr !== 'double' &&
            phoneTypeStr !== 'zkdouble' &&
            phoneTypeStr !== 'fdouble'
          "
          class="soft-function diafunction"
          :class="{ disabled: dtmfDisable }"
          id="softphone-makecall"
          @click="handleAgentBarBtnClick('dtmf')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfont">&#xe6a9;</i>
          </div>
          <div class="text">按键</div>
        </div>
        <div
          v-show="
            phoneTypeStr !== 'double' &&
            phoneTypeStr !== 'zkdouble' &&
            phoneTypeStr !== 'fdouble' &&
            initConfig.enableWebRTC === 'true'
          "
          class="soft-function"
          :class="{ disabled: !sip.answerBtnEnable }"
          id="softphone-answer"
          @click="handleAgentBarBtnClick('answer')"
        >
          <div class="icon" style="margin-top: 2px">
            <i class="kfont">&#xe60a;</i>
          </div>
          <div class="text">接听</div>
        </div>
        <div class="soft-function" @click="handleAgentBarBtnClick('zhedie')">
          <div class="icon" style="margin-top: 2px">
            <i class="kfontplus" style="font-size: 20px">></i>
          </div>
          <div class="text">折叠</div>
        </div>
        <!-- <div class="soft-function diafunction" @click="handleAgentBarBtnClick">
            <div>展开</div>
            <div>折叠</div>
          </div> -->
        <!-- <div v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'" class="soft-function" :class="{disabled:holdDisable}" id="softphone-status">
              <div class="soft-function hold" v-show="!isHold" @click="handleAgentBarBtnClick('hold')">
                  <div class="icon"><i class="kfont">&#xe953;</i></div>
                  <div class="text">保持</div>
              </div>
              <div class="soft-function unhold" v-show="isHold" @click="handleAgentBarBtnClick('unhold')">
                  <div class="icon"><i class="kfont">&#xe605;</i></div>
                  <div class="text">取回</div>
              </div>
          </div>
          <div v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'" class="soft-function" :class="{disabled:threewayDisable}" id="softphone-threeway" data-toggle="soft-function" data-action="threeway" @click="handleAgentBarBtnClick('threeway')">
              <div class="icon" style="margin-top:2px;"><i class="kfont">&#xe8fb;</i></div>
              <div class="text">三方</div>
          </div>
          <div v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'" class="soft-function" :class="{disabled:transDisable}" id="softphone-trans" data-toggle="soft-function" data-action="trans" @click="handleAgentBarBtnClick('trans')">
              <div class="icon" style="margin-top:2px;"><i class="kfont">&#xe6b8;</i></div>
              <div class="text">转接</div>
          </div>
          <div v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'" class="soft-function" :class="{disabled:consultDisable}" id="softphone-trans" data-toggle="soft-function" data-action="trans" @click="handleAgentBarBtnClick('consult')">
              <div class="icon" style="margin-top:2px;"><i class="kfont">&#xe62c;</i></div>
              <div class="text">咨询</div>
          </div>
          <div v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'" class="soft-function" :class="{disabled:satisfyDisable}" id="softphone-satisfy" data-toggle="soft-function" @click="handleAgentBarBtnClick('satisfy')">
              <div class="icon" style="margin-top:2px;"><i class="kfont2">&#xe61f;</i></div>
              <div class="text">满意度</div>
          </div>
          <div class="soft-function" :class="{disabled:settingDisable}" id="skytech_account" @click="handleAgentBarBtnClick('setting')">
              <div class="soft-function settings" data-toggle="soft-function">
                  <div class="icon"><i class="kfont2">&#59136;</i></div>
                  <div class="text">其他</div>
              </div>
          </div>
          <div v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble' && phoneTypeStr==='webrtc'" class="soft-function" id="softphone-detect" data-toggle="soft-function" @click="handleAgentBarBtnClick('detect')">
              <div class="icon" style="margin-top:2px;"><i class="kfont">&#xeb61;</i></div>
              <div class="text">监控</div>
          </div>
          <div v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'" class="soft-function" id="softphone-detect" style="width:auto;padding-top: 7px;">
              <p>
                  <img src="/images/wifi3.svg" style="width: 20px" v-show="networkState.delay <= 100">
                  <img src="/images/wifi22.svg" style="width: 20px" v-show="networkState.delay > 100 && networkState.delay <= 200">
                  <img src="/images/wifi1.svg" style="width: 20px" v-show="networkState.delay > 200">
              </p>
              <p style="font-size:12px;">延迟：{{networkState.delay}}</p>
          </div>
          <div style="clear:both;"></div> -->
      </div>
    </div>
    <div
      id="dialpad"
      v-show="showDialpad"
      :style="{
        left:
          phoneTypeStr === 'double' || phoneTypeStr === 'zkdouble'
            ? '50%'
            : '45%',
      }"
      style="
        width: 220px;
        border-radius: 6px;
        padding: 5px 8px 5px;
        position: absolute;
        top: 70px;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10;
      "
    >
      <div style="height: 15px">
        <Icon
          type="md-close"
          style="
            padding: 5px;
            float: right;
            cursor: pointer;
            color: #333;
            margin-bottom: 3px;
          "
          @click="showDialpad = false"
        />
      </div>
      <i-input
        ref="outNumInput"
        style="margin-bottom: 5px"
        type="text"
        v-model="outNum"
        clearable
        @on-keypress.enter="makeCall"
      ></i-input>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('1')"
            >1</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('2')"
            >2</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('3')"
            >3</i-button
          >
        </i-col>
      </Row>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('4')"
            >4</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('5')"
            >5</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('6')"
            >6</i-button
          >
        </i-col>
      </Row>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('7')"
            >7</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('8')"
            >8</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('9')"
            >9</i-button
          >
        </i-col>
      </Row>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('*')"
            >*</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('0')"
            >0</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDialpadClick('#')"
            >#</i-button
          >
        </i-col>
      </Row>
      <Row>
        <i-col span="8" style="text-align: center" offset="8">
          <i-button
            size="large"
            shape="circle"
            icon="md-call"
            @click="makeCall"
          ></i-button>
        </i-col>
      </Row>
    </div>
    <div
      id="dtmfDialpad"
      v-show="showDtmfDialpad"
      style="
        width: 220px;
        border-radius: 6px;
        padding: 5px 8px 5px;
        position: absolute;
        top: 52px;
        left: 690px;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      "
    >
      <div style="height: 15px">
        <icon
          type="md-close"
          style="
            padding: 5px;
            float: right;
            cursor: pointer;
            color: #333;
            margin-bottom: 3px;
          "
          @click="showDtmfDialpad = false"
        />
      </div>
      <i-input
        ref="dtmfNumInput"
        style="margin-bottom: 5px"
        type="text"
        v-model="dtmfNum"
        clearable
      ></i-input>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('1')"
            >1</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('2')"
            >2</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('3')"
            >3</i-button
          >
        </i-col>
      </Row>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('4')"
            >4</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('5')"
            >5</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('6')"
            >6</i-button
          >
        </i-col>
      </Row>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('7')"
            >7</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('8')"
            >8</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('9')"
            >9</i-button
          >
        </i-col>
      </Row>
      <Row style="margin: 6px 0">
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('*')"
            >*</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('0')"
            >0</i-button
          >
        </i-col>
        <i-col span="8" style="text-align: center">
          <i-button
            style="padding: 8px 15px"
            size="large"
            type="primary"
            shape="circle"
            @click="handleDtmf('#')"
            >#</i-button
          >
        </i-col>
      </Row>
    </div>
    <Modal
      class-name="login-constom"
      v-model="showLoginDialpad"
      title="请登录"
      @on-ok="handleSubmit('formValidate')"
      @on-cancel="handleReset('formValidate')"
      okText="登录"
      cancelText="取消"
      width="30%"
    >
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="50"
      >
        <FormItem label="账号" prop="name">
          <Input
            v-model="formValidate.name"
            placeholder="请输入天客云账号"
          ></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input
            v-model="formValidate.password"
            placeholder="请输入密码"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
    <!-- <Modal title="监控" v-model="showDetect" :mask="false" :width="800" :styles="{top:'30px'}">
        <div style="margin-bottom: 10px;">
            <span>接收丢包率：</span><span>{{(networkState.lossReceivedRate*100).toFixed(2)+'%'}}</span>
            <span style="margin-left: 10px;">发送丢包率：</span><span>{{(networkState.lossSentRate*100).toFixed(2)+'%'}}</span>
            <span style="margin-left: 10px;">延迟：</span><span>{{networkState.delay}}</span>
        </div>
        <Row>
            <Col span="12">
                <div id="lossReceivedRateChart"></div>
            </Col>
            <Col span="12">
                <div id="lossSentRateChart"></div>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <div id="delayChart"></div>
            </Col>
        </Row>
        <div slot="footer"></div>
    </Modal>
    <Modal title="其他" v-model="showSetting" :mask="false">
      <Form :label-width="120">
        <FormItem label="ACW设置"  v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'">
          <InputNumber type="number" :min="-1" placeholder="输入秒数" :value="progressOverTime" @on-change="handleACWChange"></InputNumber>
        </FormItem>
        <FormItem label="呼入转手机"  v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'">
          <i-switch size="large" v-model="callInToMobile" @on-change="setCallInToMobile" :disabled="callInToMobileDisable">
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="挂机后状态变更" v-show="phoneTypeStr !== 'double' && phoneTypeStr !== 'zkdouble' && phoneTypeStr !== 'fdouble'">
            <Select clearable v-model="afterHangupStatus" @on-change="setAfterHangupStatus" style="width: 150px;" :disabled="callInToMobileDisable">
              <Option value="READY">空闲</Option>
              <Option value="BUSY">置忙</Option>
              <Option value="POSTPROGRESS">后处理</Option>
            </Select>
        </FormItem>
        <FormItem label="模式选择">
          <Select v-model="phoneTypeStr" @on-change="setPhoneTypeStr" style="width: 150px;">
              <Option v-for="item in phoneTypeStrList" :value="item" :key="item">{{ phoneTypeStrNames[item] }}</Option>
          </Select>
        </FormItem>
        <FormItem label="ICE超时设置" v-show="initConfig.enableWebRTC === 'true'">
          <InputNumber type="number" :min="0" placeholder="输入毫秒数" :value="initConfig.iceCheckTimeout" @on-change="handleICETimeoutChange"></InputNumber> 毫秒
        </FormItem>
        <FormItem label="自动接听" v-show="initConfig.enableWebRTC === 'true'">
          <i-switch size="large" v-model="sip.autoAnswer" @on-change="setAutoAnswer">
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
          </i-switch>
        </FormItem>
        <FormItem label="注册心跳时间设置" v-show="initConfig.enableWebRTC === 'true'">
          <InputNumber type="number" :min="60" :max="600" :value="initConfig.register_expire" @on-change="handleRegisterExpireChange"></InputNumber> 秒
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal> -->
    <!-- <Modal v-model="showThreeway" :mask="false">
      <div slot="title"></div>
      <Tabs value="agent">
        <TabPane label="转坐席" name="agent">
          <Table :data="threewayAgentCurrentData" :columns="threewayAgentCol"></Table>
          <Page style="float: right;margin-top: 8px;" :total="agentData.length" size="small" @on-change="handleThreewayAgentPageChange"></Page>
        </TabPane>
      </Tabs>
      <div slot="footer"></div>
    </Modal> -->
    <!-- <Modal v-model="showTrans" :mask="false">
      <div slot="title"></div>
      <Tabs value="agent">
          <TabPane label="转坐席" name="agent">
              <Table :data="agentCurrentData" :columns="agentCol"></Table>
              <Page style="float: right;margin-top: 8px;" :total="agentData.length" size="small" @on-change="handleAgentPageChange"></Page>
          </TabPane>
          <TabPane label="转队列" name="queue">
              <Table :data="queueData" :columns="queueCol"></Table>
              <Page style="float: right;margin-top: 8px;" :total="queueTotal" size="small" @on-change="handleQueuePageChange"></Page>
          </TabPane>
          <TabPane label="转外部" name="out">
              <Form inline :label-width="100">
                  <FormItem label="外部号码：">
                      <Input style="width:200px;" number v-model="transOutNum" />
                      <Button type="primary" style="margin-left: 5px;" @click="handleTransOut">提交</Button>
                  </FormItem>
              </Form>
          </TabPane>
      </Tabs>
      <div slot="footer"></div>
    </Modal> -->
    <!-- <Modal v-model="showConsult" :mask="false">
      <div slot="title"></div>
          <Table ref="consultTable" :data="agentCurrentData" :columns="consultCol" style="margin-top: 20px;"></Table>
          <Page style="float: right;margin-top: 8px;" :total="queueTotal" size="small" @on-change="handleAgentPageChange"></Page>
          <ButtonGroup style="margin-top: 8px;">
              <i-button type="success" @click="handleConsult('trans')">咨询转接</i-button>
              <i-button type="success" @click="handleConsult('getBack')">咨询取回</i-button>
              <i-button type="success" @click="handleConsult('meeting')">咨询会议</i-button>
          </ButtonGroup>
      <div slot="footer"></div>
    </Modal> -->
    <!-- <div class="rest-modal" v-show="showRest">
        <i-select v-model="restReason" style="width: 180px;">
          <i-option value="MEET">开会</i-option>
          <i-option value="TRAIN">培训</i-option>
          <i-option value="ORGANIZE">组织</i-option>
          <i-option value="EAT">吃饭</i-option>
          <i-option value="REST">休息</i-option>
        </i-select>
        <i-button type="primary" style="margin-left: 5px;" @click="submitRest">确定</i-button>
    </div> -->
    <!-- <Modal
      v-model="micCheckModal"
      ok-text="重试"
      cancel-text="取消"
      @on-ok="micCheckRetry"
      @on-cancel="micCheckCancel"
      width="600"
      :mask-closable="false"
      :closable="false">
      <Row>
          <Col span="3" style="text-align: center"><icon color="#f60" size="55" type="ios-close-circle-outline" /></Col>
          <Col span="21">
              <p style="font-size:22px">电话麦克风出现问题，系统坐席未登录。</p>
              <p style="font-size:16px;padding-top: 2px">请检查设备链接情况,尝试重新拔插USB接口或请IT管理员协助处理!</p>
          </Col>
      </Row>
    </Modal> -->
  </div>
</template>
<script>
import "./css/common.css";
import "./css/ktkefu.css";
import "./js/axios.min.js";
// import './js/g2plot.js';
import "./js/ctibar-0.0.10.min.js";
import { getData, my_url } from "../../static/js/ajax.js";

Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

const REST = "休息";
const MEET = "开会";
const TRAIN = "培训";
const ORGANIZE = "组织";
const EAT = "吃饭";

window.openPanelMakeCall = function (phoneNo, isAutoCall) {
  phoneNo = phoneNo.replace(/[^0-9]/g, "");
  if (localStorage.phoneTypeStr === "double") {
    CtiAgentBar.doubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error({
            content: res.data.data.msg,
            duration: 30,
            closable: true,
          });
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else if (localStorage.phoneTypeStr === "zkdouble") {
    CtiAgentBar.ZKdoubleMakeCall(
      phoneNo,
      sessionStorage["agentbar-token"]
    ).then((res) => {
      if (res.data.code === 200 && res.data.data.success) {
        window.kefuFunc.onRing({ phoneNo });
        window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
        window.vm.$refs.agentBar.$Message.success("正在外呼中，请注意接听...");
      } else if (res.data.data.msg) {
        window.vm.$refs.agentBar.$Message.error({
          content: res.data.data.msg,
          duration: 30,
          closable: true,
        });
      } else {
        window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
      }
    });
  } else if (localStorage.phoneTypeStr === "fdouble") {
    CtiAgentBar.FdoubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error({
            content: res.data.data.msg,
            duration: 30,
            closable: true,
          });
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else {
    window.sessionStorage.setItem("popscreen-phone", phoneNo);
    window.sessionStorage.setItem("makecall-taskid", "");
    CtiAgentBar.makecall(phoneNo);
  }
};
window.makeCall = function (phoneNo, isEncodePhone) {
  phoneNo = isEncodePhone ? phoneNo : phoneNo.replace(/[^0-9]/g, "");
  if (localStorage.phoneTypeStr === "double") {
    CtiAgentBar.doubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error({
            content: res.data.data.msg,
            duration: 30,
            closable: true,
          });
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else if (localStorage.phoneTypeStr === "zkdouble") {
    CtiAgentBar.ZKdoubleMakeCall(
      phoneNo,
      sessionStorage["agentbar-token"]
    ).then((res) => {
      if (res.data.code === 200 && res.data.data.success) {
        window.kefuFunc.onRing({ phoneNo });
        window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
        window.vm.$refs.agentBar.$Message.success("正在外呼中，请注意接听...");
      } else if (res.data.data.msg) {
        window.vm.$refs.agentBar.$Message.error({
          content: res.data.data.msg,
          duration: 30,
          closable: true,
        });
      } else {
        window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
      }
    });
  } else if (localStorage.phoneTypeStr === "fdouble") {
    CtiAgentBar.FdoubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error({
            content: res.data.data.msg,
            duration: 30,
            closable: true,
          });
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else {
    window.sessionStorage.setItem("popscreen-phone", phoneNo);
    window.sessionStorage.setItem("disableRingOnce", "true");
    window.sessionStorage.setItem("makecall-taskid", "");
    return CtiAgentBar.makecall(
      phoneNo,
      JSON.stringify({
        isEncodePhone,
      })
    );
  }
};

window.makeCallWithCallTask = function (phoneNo, taskid) {
  phoneNo = phoneNo.replace(/[^0-9]/g, "");
  if (localStorage.phoneTypeStr === "double") {
    CtiAgentBar.doubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error({
            content: res.data.data.msg,
            duration: 30,
            closable: true,
          });
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else if (localStorage.phoneTypeStr === "zkdouble") {
    CtiAgentBar.ZKdoubleMakeCall(
      phoneNo,
      sessionStorage["agentbar-token"]
    ).then((res) => {
      if (res.data.code === 200 && res.data.data.success) {
        window.kefuFunc.onRing({ phoneNo });
        window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
        window.vm.$refs.agentBar.$Message.success("正在外呼中，请注意接听...");
      } else if (res.data.data.msg) {
        window.vm.$refs.agentBar.$Message.error({
          content: res.data.data.msg,
          duration: 30,
          closable: true,
        });
      } else {
        window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
      }
    });
  } else if (localStorage.phoneTypeStr === "fdouble") {
    CtiAgentBar.FdoubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error({
            content: res.data.data.msg,
            duration: 30,
            closable: true,
          });
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else {
    window.sessionStorage.setItem("popscreen-phone", phoneNo);
    window.sessionStorage.setItem("disableRingOnce", "true");
    window.sessionStorage.setItem("makecall-taskid", taskid);
    CtiAgentBar.makecall(phoneNo);
  }
};

window.makeCallWithExtraData = function (
  phoneNo,
  contactid,
  busTag,
  isEncodePhone
) {
  phoneNo = isEncodePhone ? phoneNo : phoneNo.replace(/[^0-9]/g, "");
  if (localStorage.phoneTypeStr === "double") {
    CtiAgentBar.doubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error(res.data.data.msg);
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else if (localStorage.phoneTypeStr === "zkdouble") {
    CtiAgentBar.ZKdoubleMakeCall(
      phoneNo,
      sessionStorage["agentbar-token"]
    ).then((res) => {
      if (res.data.code === 200 && res.data.data.success) {
        window.kefuFunc.onRing({ phoneNo });
        window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
        window.vm.$refs.agentBar.$Message.success("正在外呼中，请注意接听...");
      } else if (res.data.data.msg) {
        window.vm.$refs.agentBar.$Message.error({
          content: res.data.data.msg,
          duration: 30,
          closable: true,
        });
      } else {
        window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
      }
    });
  } else if (localStorage.phoneTypeStr === "fdouble") {
    CtiAgentBar.FdoubleMakeCall(phoneNo, sessionStorage["agentbar-token"]).then(
      (res) => {
        if (res.data.code === 200 && res.data.data.success) {
          window.kefuFunc.onRing({ phoneNo });
          window.vm.$refs.agentBar.sessionId = res.data.data.sessionId;
          window.vm.$refs.agentBar.$Message.success(
            "正在外呼中，请注意接听..."
          );
        } else if (res.data.data.msg) {
          window.vm.$refs.agentBar.$Message.error({
            content: res.data.data.msg,
            duration: 30,
            closable: true,
          });
        } else {
          window.vm.$refs.agentBar.$Message.error("外呼失败，请联系管理员");
        }
      }
    );
  } else {
    window.sessionStorage.setItem("popscreen-phone", phoneNo);
    window.sessionStorage.setItem("disableRingOnce", "true");
    window.sessionStorage.setItem("makecall-taskid", "");
    CtiAgentBar.makecall(
      phoneNo,
      JSON.stringify({
        popScreen: {
          contactid: contactid,
        },
        businessType: busTag,
        isEncodePhone: isEncodePhone,
      })
    );
  }
};

window.listenCall = function (uuid, listened) {
  CtiAgentBar.listenCall(uuid, listened);
};

window.bargeinCall = function () {
  CtiAgentBar.bargeinCall();
};

window.whisperCall = function () {
  CtiAgentBar.whisperCall();
};

window.threewayCall = function () {
  CtiAgentBar.threewayCall();
};

window.restoreCall = function () {
  CtiAgentBar.restoreCall();
};

window.dtmf = function (val) {
  CtiAgentBar.dtmf(val);
};
export default {
  name: "AgentBar",
  data() {
    return {
      micCheckModal: false,
      inDeviceList: [],
      outDeviceList: [],
      initConfig: {
        inDeviceId: "default",
        outDeviceId: "default",
        baseUrl: "",
        username: "",
        password: "",
        stateEventListener: this.stateEventListener,
        enableWebRTC: "true",
        popScreen: this.popScreen,
        iceCheckTimeout: 500,
        webRTCAutoAnswer: localStorage.autoAnswer
          ? localStorage.autoAnswer === "true"
          : false,
        debug: false,
        register_expire: 600,
        httpErrorCallback: this.httpErrorCallback,
      },
      timer: null,
      timerString: "00:00:00",
      phoneTypeStr: "",
      phoneTypeStrList: [],
      phoneTypeStrNames: {
        hard: "硬件电话模式",
        webrtc: "WebRTC模式",
        double: "双呼模式Ⅰ",
        zkdouble: "双呼模式Ⅱ",
        fdouble: "双呼模式Ⅲ",
      },
      transOutNum: "",
      sip: {
        enable: false,
        answerBtnEnable: false,
        autoAnswer: false,
        sip_domain: "",
        sip_password: "",
        sip_autoAnswer: false,
        wss_proto: "",
        wss_address: "",
        wss_port: 0,
        ice_checkTimeout: 500,
      },
      callInToMobile: false,
      callInToMobileDisable: true,
      agentState: "",
      statusDisable: true,
      loginDisable: false,
      readyDisable: true,
      busyDisable: true,
      restDisable: true,
      progressDisable: true,
      hangupDisable: true,
      makeCallDisable: true,
      dtmfDisable: true,
      holdDisable: true,
      threewayDisable: true,
      transDisable: true,
      consultDisable: true,
      satisfyDisable: true,
      settingDisable: false,
      customerCall: "",
      showRest: false,
      restReason: "",
      showDialpad: false,
      showDtmfDialpad: false,
      outNum: "",
      dtmfNum: "",
      customerPhone: "",
      agentNo: "",
      activityid: "",
      agentCol: [
        { title: "坐席名称", key: "userAgent", align: "center" },
        { title: "坐席号码", key: "fromUser", align: "center" },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                },
                on: {
                  click: () => {
                    this.transfer(
                      "0",
                      params.row.fromUser,
                      "",
                      this.customerCall,
                      params.row.userId
                    );
                    this.showThreeway = false;
                    this.showTrans = false;
                  },
                },
              },
              "选择"
            );
          },
        },
      ],
      consultCol: [
        { title: "坐席名称", key: "userAgent", align: "center" },
        { title: "坐席号码", key: "fromUser", align: "center" },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                },
                on: {
                  click: () => {
                    CtiAgentBar.consult(params.row.fromUser, params.row.userId);
                  },
                },
              },
              "转接"
            );
          },
        },
      ],
      threewayAgentCol: [
        { title: "坐席名称", key: "userAgent", align: "center" },
        { title: "坐席号码", key: "fromUser", align: "center" },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                },
                on: {
                  click: () => {
                    CtiAgentBar.threeWay("0", params.row.fromUser);
                    this.showThreeway = false;
                    this.showTrans = false;
                  },
                },
              },
              "选择"
            );
          },
        },
      ],
      agentData: [],
      queueCol: [
        { title: "队列名称", key: "name", align: "center" },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "primary",
                },
                on: {
                  click: () => {
                    this.transfer(
                      "2",
                      "",
                      params.row.id,
                      this.customerCall,
                      ""
                    );
                    this.showThreeway = false;
                    this.showTrans = false;
                  },
                },
              },
              "选择"
            );
          },
        },
      ],
      queueData: [],
      queueOriginData: [],
      agentPage: 1,
      threewayAgentPage: 1,
      queuePage: 1,
      queueTotal: 0,
      agentCurrentData: [],
      threewayAgentCurrentData: [],
      queueCurrentData: [],
      agentPageSize: 10,
      queuePageSize: 10,
      consultQuery: {},
      myTimeOut: null,
      showTrans: false,
      showConsult: false,
      showThreeway: false,
      showDetect: false,
      isLogin: false,
      isHold: false,
      showSetting: false,
      progressOverTime: localStorage.progressOverTime
        ? localStorage.progressOverTime
        : null,
      peerConnection: null,
      networkStateTimer: null,
      networkState: {
        byteSentPs: 0,
        byteReceivedPs: 0,
        lastTimeStamp: 0,
        lastBytesSent: 0,
        lastBytesReceived: 0,
        lastPacketsSent: 0,
        lastPacketsReceived: 0,
        lastLossSent: 0,
        lastLossReceived: 0,
        levelSent: 0,
        levelReceived: 0,
        codecSent: "",
        codecReceived: "",
        lossSentRate: 0,
        lossReceivedRate: 0,
        delay: 0,
        lossSentRateList: [],
        lossReceivedRateList: [],
        delayList: [],
      },
      webRTCCallback: {
        handle: (event, msg) => {
          if (event === "check") {
            if (!msg) {
              this.micCheckModal = true;
            }
          }
          if (event === "disconnected") {
            let logoutMsg = "WebRTC掉线，分机已注销。是否重连？";
            this.writeLog("WebRTC掉线，分机已注销。");
            this.logout();
            this.$Modal.confirm({
              title: logoutMsg,
              okText: "重连",
              cancelText: "取消",
              onOk: () => {
                this.login();
              },
            });
          }
          if (event === "invite") {
            if ("true" === window.sessionStorage.disableRingOnce) {
              window.sessionStorage.disableRingOnce = "false";
            } else {
              this.playRingMedia();
            }
          }
          if (event === "accepted") {
            this.networkState = {
              lastTimeStamp: 0,
              lastBytesSent: 0,
              lastBytesReceived: 0,
              lossSentRate: 0,
              lossReceivedRate: 0,
              delay: 0,
              lossSentRateList: [],
              lossReceivedRateList: [],
              delayList: [],
            };
            this.peerConnection = msg;
            this.networkStateTimer = setInterval(() => {
              this.showNetworkState();
            }, 1000);
          }
          if (event === "terminated") {
            this.peerConnection = null;
            clearInterval(this.networkStateTimer);
            this.networkStateTimer = null;
          }
        },
      },
      delayChart: null,
      lossReceivedRateChart: null,
      lossSentRateChart: null,
      afterHangupStatus: "none",
      CtiAgentBarStatue: {
        status: {
          login() {
            this.sip.answerBtnEnable = false;
            this.statusDisable = false;
            this.hangupDisable = true;
            this.isHold = false;
            this.holdDisable = true;
            this.transDisable = true;
            this.makeCallDisable = true;
            this.dtmfDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.isLogin = true;
            this.loginDisable = false;
            this.readyDisable = false;
            this.busyDisable = false;
            this.restDisable = false;
            this.progressDisable = false;
            this.satisfyDisable = true;
            this.agentState = "登录";
            this.callInToMobileDisable = false;
            //this.getAgent();
            this.getCallInToMobile();
            // if (this.initConfig.enableWebRTC) {
            //     this.startSip();
            // }
          },
          logout() {
            this.sip.answerBtnEnable = false;
            this.hangupDisable = true;
            this.isHold = false;
            this.holdDisable = true;
            if (
              localStorage.phoneTypeStr !== "double" &&
              localStorage.phoneTypeStr !== "zkdouble" &&
              localStorage.phoneTypeStr !== "fdouble"
            ) {
              this.makeCallDisable = true;
              this.hangupDisable = true;
            }
            this.transDisable = true;
            this.makeCallDisable = true;
            this.dtmfDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.isLogin = false;
            this.loginDisable = false;
            this.readyDisable = true;
            this.busyDisable = true;
            this.restDisable = true;
            this.progressDisable = true;
            this.satisfyDisable = true;
            this.agentState = "登出";
            this.callInToMobileDisable = true;
          },
          ready() {
            this.sip.answerBtnEnable = false;
            this.statusDisable = false;
            this.hangupDisable = true;
            this.isHold = false;
            this.holdDisable = true;
            this.transDisable = true;
            this.makeCallDisable = false;
            this.dtmfDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.isLogin = true;
            this.loginDisable = false;
            this.readyDisable = true;
            this.busyDisable = false;
            this.restDisable = false;
            this.progressDisable = false;
            this.satisfyDisable = true;
            this.agentState = "就绪";
            this.customerCall = "";
          },
          busy() {
            this.sip.answerBtnEnable = false;
            this.statusDisable = false;
            this.hangupDisable = true;
            this.isHold = false;
            this.holdDisable = true;
            this.transDisable = true;
            this.makeCallDisable = false;
            this.dtmfDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.isLogin = true;
            this.loginDisable = false;
            this.readyDisable = false;
            this.busyDisable = true;
            this.restDisable = false;
            this.progressDisable = false;
            this.satisfyDisable = true;
            this.agentState = "忙碌";
          },
          progress() {
            this.sip.answerBtnEnable = false;
            this.statusDisable = false;
            this.hangupDisable = true;
            this.isHold = false;
            this.holdDisable = true;
            this.transDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.makeCallDisable = false;
            this.dtmfDisable = true;
            this.isLogin = true;
            this.loginDisable = false;
            this.readyDisable = false;
            this.busyDisable = false;
            this.restDisable = false;
            this.progressDisable = true;
            this.satisfyDisable = true;
            this.agentState = "后处理";
          },
          rest(detail) {
            this.sip.answerBtnEnable = false;
            this.statusDisable = false;
            this.hangupDisable = true;
            this.isHold = false;
            this.holdDisable = true;
            this.transDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.makeCallDisable = false;
            this.dtmfDisable = true;
            this.isLogin = true;
            this.loginDisable = false;
            this.readyDisable = false;
            this.busyDisable = false;
            this.restDisable = true;
            this.progressDisable = false;
            this.satisfyDisable = true;
            switch (detail) {
              case "REST":
                this.agentState = REST;
                break;
              case "MEET":
                this.agentState = MEET;
                break;
              case "TRAIN":
                this.agentState = TRAIN;
                break;
              case "ORGANIZE":
                this.agentState = ORGANIZE;
                break;
              case "EAT":
                this.agentState = EAT;
                break;
            }
          },
          ringing(phoneNo) {
            if (this.initConfig.enableWebRTC === "true") {
              this.sip.answerBtnEnable = true;
            }

            sessionStorage["state"] = "RINGING";
            this.hangupDisable = true;
            this.isHold = false;
            this.holdDisable = true;
            this.transDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.makeCallDisable = true;
            this.dtmfDisable = true;
            this.isLogin = true;
            this.loginDisable = true;
            this.readyDisable = true;
            this.busyDisable = true;
            this.restDisable = true;
            this.progressDisable = true;
            this.satisfyDisable = true;
            this.agentState = "振铃中";
            this.customerCall = phoneNo;
          },
          accepted() {
            this.sip.answerBtnEnable = false;
            sessionStorage.setItem("state", "ACCEPTED");
            this.hangupDisable = false;
            this.isHold = false;
            this.holdDisable = false;
            this.transDisable = false;
            this.threewayDisable = false;
            this.consultDisable =
              JSON.parse(sessionStorage.popScreenData).dir !== "INBOUND";
            this.makeCallDisable = true;
            this.dtmfDisable = false;
            this.isLogin = true;
            this.loginDisable = true;
            this.readyDisable = true;
            this.busyDisable = true;
            this.restDisable = true;
            this.progressDisable = true;
            this.satisfyDisable = false;
            this.agentState = "振铃中";
          },
          hold() {
            this.sip.answerBtnEnable = false;

            this.hangupDisable = true;
            this.isHold = true;
            this.holdDisable = false;
            this.transDisable = true;
            this.threewayDisable = true;
            this.consultDisable = true;
            this.makeCallDisable = true;
            this.dtmfDisable = true;
            this.isLogin = true;
            this.loginDisable = true;
            this.readyDisable = true;
            this.busyDisable = true;
            this.restDisable = true;
            this.progressDisable = true;
            this.satisfyDisable = true;
            this.agentState = "保持";
          },
          unhold() {
            this.sip.answerBtnEnable = false;

            this.hangupDisable = false;
            this.isHold = false;
            this.holdDisable = false;
            this.transDisable = false;
            this.consultDisable =
              JSON.parse(sessionStorage.popScreenData).dir !== "INBOUND";
            this.threewayDisable = false;
            this.makeCallDisable = true;
            this.dtmfDisable = true;
            this.isLogin = true;
            // this.loginDisable = true;
            this.readyDisable = true;
            this.busyDisable = true;
            this.restDisable = true;
            this.progressDisable = true;
            this.satisfyDisable = false;
            this.agentState = "通话中";
          },
        },
      },
      zhedie: true,
      isLoginDialpad: false,
      showLoginDialpad: false,
      formValidate: {
        name: "",
        password: "",
      },
      ruleValidate: {
        name: [{ required: true, message: "用户不能为空!", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空!", trigger: "blur" },
        ],
      },
    };
  },

  watch: {
    // timerString:function(){
    //    console.log( this.timerString)
    //     if(this.timerString=="00:01:00"){
    //      alert("退出登录")
    //      this.zhedie=true
    //    }
    // }
  },

  mounted() {
    let _this = this;
    // this.initConfig.baseUrl =  'https://tky.ketianyun.com';
    // // this.initConfig.username = prompt('请输入用户名', '');
    // // this.initConfig.password = prompt('请输入密码', '');
    // //开启自动登录, 默认false
    // this.initConfig.autoLogin = true;
    // //开启自动就绪, 默认false
    // this.initConfig.autoReady = true;
    // getData('post', my_url + '/crm/call/getTkyUser.do', function (data) {
    //     if (data) {
    //         _this.initConfig.username = data.account;
    //         _this.initConfig.password = data.account_password;
    //         _this.initFn();
    //     } else {

    //     }
    // });
    // 盒子移动事件
    let callbox = this.$refs.callbox;
    let clientH = document.documentElement.clientWidth;

    callbox.onmousedown = function (event) {
      if (!_this.zhedie) return;
      // 鼠标到callbox有边框的距离
      let disx = 50 - (event.clientX - callbox.offsetLeft);

      // 鼠标到callbox右边框的距离
      let disy = event.clientY - callbox.offsetTop;
      // 鼠标到窗口右侧的距离
      let disr = clientH - event.clientX;
      //此处不是box.onmousemove，是document.onmousemove
      document.onmousemove = function (event) {
        callbox.style.right = clientH - event.clientX - disx + "px";
        callbox.style.top = event.clientY - disy + "px";
      };
      //要写在ommousedown里面
      document.onmouseup = function () {
        //这俩都要置为null
        document.onmousemove = null;
        document.onmouseup = null;
        return false;
      };
    };

    // this.initChart();
  },
  methods: {
    initFn() {
      this.loadAutoAnswer();
      this.loadICETimeout();
      this.loadRegisterExpire();
      this.init();
    },
    httpErrorCallback(error) {
      console.log(error);
    },
    micCheckRetry() {
      this.micCheckModal = false;
      this.login();
    },
    micCheckCancel() {
      this.micCheckModal = false;
    },
    writeLog(msg, a) {
      console.log("天客云2.0 电话条 [ " + msg + " ]", a);
    },
    login() {
      CtiAgentBar.login(
        this.agentNo,
        this.initConfig.inDeviceId,
        this.initConfig.outDeviceId
      );
    },
    logout() {
      CtiAgentBar.logout();
    },
    ready() {
      CtiAgentBar.ready();
    },
    busy() {
      CtiAgentBar.busy();
    },
    submitRest() {
      if (this.restReason !== "") {
        CtiAgentBar.rest(this.restReason);
        this.restReason = "";
        this.showRest = false;
      } else {
        this.$Message.warning("请选择事由！");
      }
    },
    progress() {
      CtiAgentBar.progress();
    },
    makeCall() {
      if (
        new RegExp(
          /^(\d{3}-{0,1}\d{8}|\d{4}-{0,1}\d{7,8}|1{0,1}\d{10}|10086|10010|10000|\d{0,4}114|1\d{5})$/
        ).test(this.outNum)
      ) {
        window.sessionStorage.disableRingOnce = "true";
        window.sessionStorage.setItem("popscreen-phone", this.outNum);
        if (this.phoneTypeStr === "double") {
          CtiAgentBar.doubleMakeCall(
            this.outNum,
            sessionStorage["agentbar-token"]
          ).then((res) => {
            if (res.data.code === 200 && res.data.data.success) {
              window.kefuFunc.onRing({ phoneNo: this.outNum });
              this.sessionId = res.data.data.sessionId;
              this.$Message.success("正在外呼中，请注意接听...");
            } else if (res.data.data.msg) {
              this.$Message.error({
                content: res.data.data.msg,
                duration: 30,
                closable: true,
              });
            } else {
              this.$Message.error("外呼失败，请联系管理员");
            }
            this.outNum = "";
            this.showDialpad = false;
          });
        } else if (this.phoneTypeStr === "zkdouble") {
          CtiAgentBar.ZKdoubleMakeCall(
            this.outNum,
            sessionStorage["agentbar-token"]
          ).then((res) => {
            if (res.data.code === 200 && res.data.data.success) {
              window.kefuFunc.onRing({ phoneNo: this.outNum });
              this.sessionId = res.data.data.sessionId;
              this.$Message.success("正在外呼中，请注意接听...");
            } else if (res.data.data.msg) {
              this.$Message.error({
                content: res.data.data.msg,
                duration: 30,
                closable: true,
              });
            } else {
              this.$Message.error("外呼失败，请联系管理员");
            }
            this.outNum = "";
            this.showDialpad = false;
          });
        } else if (this.phoneTypeStr === "fdouble") {
          CtiAgentBar.FdoubleMakeCall(
            this.outNum,
            sessionStorage["agentbar-token"]
          ).then((res) => {
            if (res.data.code === 200 && res.data.data.success) {
              window.kefuFunc.onRing({ phoneNo: this.outNum });
              this.sessionId = res.data.data.sessionId;
              this.$Message.success("正在外呼中，请注意接听...");
            } else if (res.data.data.msg) {
              this.$Message.error({
                content: res.data.data.msg,
                duration: 30,
                closable: true,
              });
            } else {
              this.$Message.error("外呼失败，请联系管理员");
            }
            this.outNum = "";
            this.showDialpad = false;
          });
        } else {
          CtiAgentBar.makecall(this.outNum);
          this.outNum = "";
          this.showDialpad = false;
        }
      } else {
        this.$Message.warning("无效的号码，请重新输入！");
      }
    },
    customCall(obj) {
      this.zhedie = false;
      if (!this.isLogin) {
        this.$Message.warning({
          content: "请先点击登录按钮进行登录！",
          duration: 3,
        });
        return;
      }
      console.log(obj);
      this.outNum = obj.mobile;
      this.customerPhone = obj.mobile;
      this.activityid = obj.activityid;
      this.makeCall();
    },
    phoneLogin(data) {
      var _this=this
      console.log(data);
      if (data) {
        this.zhedie = false;
        this.mainInit();
      } else {
        this.zhedie = true;
        // this.$Message.suc("30分钟后自动退出");
       
        getData(
          "post",
          my_url + "/crm/activity/tkyUserRecycle.do",
          function (data) {
            console.log(data);
            if (data.code=='0') {
              _this.$Message.success("退出成功");
            } else {
            }
          }
        );
        // this.$message({
        //   showClose: true,
        //   message: "通话结束30分钟后自动退出",
        //   duration:1500
        // });
        // alert("登出");
      }
    },

    mainInit() {
      let _this = this;
      this.initConfig.baseUrl = "https://tky.ketianyun.com";
      // this.initConfig.username = prompt('请输入用户名', '');
      // this.initConfig.password = prompt('请输入密码', '');
      //开启自动登录, 默认false
      this.initConfig.autoLogin = true;
      //开启自动就绪, 默认false
      this.initConfig.autoReady = true;
      getData("post", my_url + "/crm/activity/getTkyUser.do", function (data) {
        console.log(data);
        _this.$emit("extensionNumber", data.extension_number);

        if (data) {
          _this.initConfig.username = data.account;
          _this.initConfig.password = data.account_password;
          _this.initFn();
        } else {
        }
      });
    },

    hold() {
      CtiAgentBar.hold();
    },
    unhold() {
      CtiAgentBar.unhold();
    },
    hangup() {
      if (this.phoneTypeStr === "double") {
        if (this.sessionId !== "") {
          CtiAgentBar.doubleHangUp(
            this.sessionId,
            sessionStorage["agentbar-token"]
          );
        }
      } else if (this.phoneTypeStr === "zkdouble") {
        if (this.sessionId !== "") {
          CtiAgentBar.ZKdoubleHangUp(
            this.sessionId,
            sessionStorage["agentbar-token"]
          );
        }
      } else if (this.phoneTypeStr === "fdouble") {
        if (this.sessionId !== "") {
          CtiAgentBar.FdoubleHangUp(
            this.sessionId,
            sessionStorage["agentbar-token"]
          );
        }
      } else {
        CtiAgentBar.hangup();
      }
    },
    dtmf(val) {
      CtiAgentBar.dtmf(val);
    },
    satisfy() {
      CtiAgentBar.satisfy();
    },
    transfer(type, transferNo, transferQueue, transfeeNo, transferUserId) {
      CtiAgentBar.transfer(
        type,
        transferNo,
        transferQueue,
        transfeeNo,
        transferUserId
      );
    },
    handleTransOut() {
      this.transfer("1", this.transOutNum, "", this.customerCall, "");
    },
    handleAgentBarBtnClick(name) {
      if (name === "login") {
        this.login();
      } else if (name === "logout") {
        this.logout();
      } else if (name === "ready") {
        if (!this.readyDisable) {
          this.ready();
        }
      } else if (name === "busy") {
        if (!this.busyDisable) {
          this.busy();
        }
      } else if (name === "rest") {
        if (!this.restDisable) {
          this.showRest = !this.showRest;
        }
      } else if (name === "progress") {
        if (!this.progressDisable) {
          this.progress();
        }
      } else if (name === "hangup") {
        if (!this.hangupDisable) {
          this.hangup();
        }
      } else if (name === "makeCall") {
        if (!this.makeCallDisable) {
          this.showDialpad = !this.showDialpad;
          if (this.showDialpad) {
            setTimeout(() => {
              this.$refs.outNumInput.focus();
            }, 1);
          }
        }
      } else if (name === "dtmf") {
        if (!this.dtmfDisable) {
          this.showDtmfDialpad = !this.showDtmfDialpad;
        }
      } else if (name === "hold") {
        if (!this.holdDisable) {
          this.hold();
        }
      } else if (name === "unhold") {
        if (!this.holdDisable) {
          this.unhold();
        }
      } else if (name === "threeway") {
        if (!this.threewayDisable) {
          this.showThreeway = !this.showThreeway;
          if (this.showThreeway) {
            this.threewayGetAgent();
          }
        }
      } else if (name === "trans") {
        if (!this.transDisable) {
          this.showTrans = !this.showTrans;
          if (this.showTrans) {
            this.getAgent();
            this.getQueue(0);
          }
        }
      } else if (name === "consult") {
        if (!this.consultDisable) {
          this.showConsult = !this.showConsult;
          if (this.showConsult) {
            this.getAgent();
          }
        }
        this.$refs.consultTable.clearCurrentRow();
      } else if (name === "satisfy") {
        if (!this.satisfyDisable) {
          this.satisfy();
          this.satisfyDisable = true;
          setTimeout(() => {
            this.satisfyDisable = false;
          }, 1000);
        }
      } else if (name === "setting") {
        if (!this.settingDisable) {
          this.getCallInToMobile();
          this.showSetting = !this.showSetting;
        }
      } else if (name === "answer") {
        CtiAgentBar.webRTCAnswer();
      } else if (name === "detect") {
        this.showDetect = !this.showDetect;
      } else if (name === "zhedie") {
        this.zhedie = !this.zhedie;
      }
    },
    handleOpenDialpad() {
      this.showDialpad = !this.showDialpad;
      if (this.showDialpad) {
        setTimeout(() => {
          this.$refs.outNumInput.focus();
        }, 1);
      }
    },
    handleDialpadClick(val) {
      this.outNum += val;
      this.$refs.outNumInput.focus();
    },
    handleDtmf(val) {
      this.dtmfNum += val;
      this.dtmf(val);
    },
    httpErrorCallback(response) {
      console.log(response);
    },
    initCallback(data) {
      if (data.code === 200) {
        this.writeLog(JSON.stringify(data.msg), "2");
      } else {
        this.logout();
        this.CtiAgentBarStatue.status.logout.call(this);
      }
    },
    getAgent() {
      CtiAgentBar.getAgentInfo().then((res) => {
        this.agentData = res;
        this.agentPage = 1;
        this.agentCurrentData = this.agentData.slice(0, this.agentPageSize);
      });
    },
    getQueue(page) {
      CtiAgentBar.getQueueInfo(this.queuePage, this.queuePageSize).then(
        (res) => {
          this.queueData = res.data;
          this.queueTotal = res.total;
        }
      );
    },
    threewayGetAgent() {
      CtiAgentBar.getAgentInfo().then((res) => {
        this.agentData = res;
        this.threewayAgentPage = 1;
        this.threewayAgentCurrentData = this.agentData.slice(
          this.threewayAgentPage * this.agentPageSize - this.agentPageSize,
          this.threewayAgentPage * this.agentPageSize
        );
      });
    },
    handleAgentPageChange(page) {
      this.agentPage = page;
      this.agentCurrentData = this.agentData.slice(
        this.agentPage * this.agentPageSize - this.agentPageSize,
        this.agentPage * this.agentPageSize
      );
    },
    handleThreewayAgentPageChange(page) {
      this.threewayAgentPage = page;
      this.threewayAgentCurrentData = this.agentData.slice(
        this.threewayAgentPage * this.agentPageSize - this.agentPageSize,
        this.threewayAgentPage * this.agentPageSize
      );
    },
    handleQueuePageChange(page) {
      this.queuePage = page;
      this.getQueue(this.queuePage);
    },
    // handleConsultChoose(row){
    //     this.currentConsultRow = row;
    // },
    handleConsult(name) {
      // if(!this.currentConsultRow){
      //     this.$Message.warning('请先选择坐席！');
      //     return;
      // }
      if (name === "consult") {
        CtiAgentBar.consult();
      } else if (name === "trans") {
        CtiAgentBar.consultComplete();
      } else if (name === "getBack") {
        CtiAgentBar.consultCancel();
      } else if (name === "meeting") {
        CtiAgentBar.consultConf();
      }
      this.showConsult = false;
    },
    goBackToReady() {
      if (this.progressOverTime && parseInt(this.progressOverTime) !== -1) {
        var num = parseInt(this.progressOverTime);
        clearTimeout(this.myTimeOut);
        if (num !== -1) {
          this.myTimeOut = setTimeout(() => {
            if (sessionStorage.state === "CB_PROGRESS") {
              this.toReady();
            }
          }, 1000 * num);
        }
      }
    },
    toReady() {
      if ("CB_PROGRESS" === sessionStorage["state"]) {
        CtiAgentBar.ready();
      }
    },
    popScreen(data) {
      if (data.dir === "INBOUND") {
        if (window.Notification) {
          if (Notification.permission === "default") {
            Notification.requestPermission();
          } else {
            let notification = new Notification(
              "来电号码：" + data.popScreenNo,
              { icon: "/images/favicon.ico" }
            );
            notification.onclick = (e) => {
              e.preventDefault();
              window.focus();
            };
          }
        } else {
          console.log("浏览器不支持通知功能");
        }
      }
      if (window.kefuFunc && window.kefuFunc.onRing) {
        //window.kefuFunc.onRing(data.popScreenNo, data.userName, data.originalCallId, data.businessId);
        window.kefuFunc.onRing({
          phoneNo: data.popScreenNo,
          direction: data.dir,
        });
      }
    },
    //参数为时间差秒数，返回这两个时间差并格式化
    computeTimeDiff(diff) {
      diff = Math.round(diff / 1000);
      let hour = Math.floor(diff / 3600)
        .toString()
        .padStart(2, "0");
      let min = Math.floor((diff - hour * 3600) / 60)
        .toString()
        .padStart(2, "0");
      let sec = (diff % 60).toString().padStart(2, "0");
      return hour + ":" + min + ":" + sec;
    },
    stateEventListener(data) {
      this.writeLog(JSON.stringify(data), "1");
      let origin = new Date().getTime();
      switch (data.event) {
        case "CB_CONNECT":
          if (data.data.code === 200) {
            window.sessionStorage["agentbar-request"] = data.data.data;
            this.getBindNo();
          }
          this.stopPlayRingMedia();
          break;
        case "CB_LOGIN":
          if (data.data.code === 200) {
            this.CtiAgentBarStatue.status.login.call(this);
            window.sessionStorage["state"] = data.event;
            console.log(data.data.data.agentNo);
            this.$emit("extensionNumber", data.data.data.agentNo);
          } else {
            this.$Message.warning({ content: data.data.message, duration: 3 });
          }
          this.stopPlayRingMedia();
          clearInterval(this.timer);
          this.timerString = "00:00:00";
          this.timer = setInterval(() => {
            this.timerString = this.computeTimeDiff(
              new Date().getTime() - origin
            );
          }, 1000);
          break;
        case "CB_LOGOUT":
          this.CtiAgentBarStatue.status.logout.call(this);
          window.sessionStorage["state"] = data.event;
          this.stopPlayRingMedia();
          clearInterval(this.timer);
          this.timerString = "00:00:00";
          this.timer = null;

          this.$emit("phoneLogon", false);

          break;

        case "CB_READY":
          if (data.data.code === 200) {
            this.CtiAgentBarStatue.status.ready.call(this);
            window.sessionStorage["state"] = data.event;
            this.$emit("phoneLogon", true);
          } else {
            this.$Message.warning({ content: data.data.message, duration: 3 });
          }
          this.stopPlayRingMedia();
          this.dtmfNum = "";
          clearInterval(this.timer);
          this.timerString = "00:00:00";
          this.timer = setInterval(() => {
            this.timerString = this.computeTimeDiff(
              new Date().getTime() - origin
            );
          }, 1000);
          break;
        case "CB_BUSY":
          if (data.data.code === 200) {
            this.CtiAgentBarStatue.status.busy.call(this);
            window.sessionStorage["state"] = data.event;
          } else {
            this.$Message.warning({ content: data.data.message, duration: 3 });
          }
          this.stopPlayRingMedia();
          clearInterval(this.timer);
          this.timerString = "00:00:00";
          this.timer = setInterval(() => {
            this.timerString = this.computeTimeDiff(
              new Date().getTime() - origin
            );
          }, 1000);
          break;

        case "CB_REST":
          if (data.data.code === 200) {
            this.CtiAgentBarStatue.status.rest.call(
              this,
              data.data.data.detail
            );
            window.sessionStorage["state"] = data.event;
          } else {
            this.$Message.warning({ content: data.data.message, duration: 3 });
          }
          this.stopPlayRingMedia();
          clearInterval(this.timer);
          this.timerString = "00:00:00";
          this.timer = setInterval(() => {
            this.timerString = this.computeTimeDiff(
              new Date().getTime() - origin
            );
          }, 1000);
          break;

        case "CB_PROGRESS":
          if (data.data.code === 200) {
            this.CtiAgentBarStatue.status.progress.call(this);
            window.sessionStorage["state"] = data.event;
            //ACW处理
            this.goBackToReady();
          } else {
            this.$Message.warning({ content: data.data.message, duration: 3 });
          }
          this.stopPlayRingMedia();
          this.dtmfNum = "";
          clearInterval(this.timer);
          this.timerString = "00:00:00";
          this.timer = setInterval(() => {
            this.timerString = this.computeTimeDiff(
              new Date().getTime() - origin
            );
          }, 1000);
          break;

        case "CB_RINGING":
          this.CtiAgentBarStatue.status.ringing.call(
            this,
            data.data.data.popScreenNo
          );
          window.sessionStorage["state"] = data.event;
          window.sessionStorage["popScreenData"] = JSON.stringify(
            data.data.data
          );

          let params = {
            activityserialno: this.activityid,
            callid: data.data.data.callId,
            callee: this.customerPhone,
          };
          getData(
            "post",
            my_url + "/crm/activity/activityCall.do",
            function (data) {
              if (data.code == 0) {
                // let params = {
                // Action: "DialCTI",
                // dn: data.phoneno,
                // anis: data.phoneprefix + phoneStr,
                // cltid: data.callid
                // };
                // getPhoneData('post', 'http://' + data.phoneurl + '/CRM2CTI/', function (data) { }, params);
                this.activityid = "";
                this.customerPhone = "";
              } else {
                _this.$message({
                  showClose: true,
                  message: data.msg,
                  duration: 3000,
                  type: "error",
                });
              }
            },
            params
          );
          break;

        case "CB_ANSWERING":
          this.CtiAgentBarStatue.status.accepted.call(this);
          window.sessionStorage["state"] = data.event;
          this.stopPlayRingMedia();
          clearInterval(this.timer);
          this.timerString = "00:00:00";
          this.timer = setInterval(() => {
            this.timerString = this.computeTimeDiff(
              new Date().getTime() - origin
            );
          }, 1000);
          break;

        case "CB_REALTIME":
          this.writeLog("-------> 被叫应答 <-------");
          clearInterval(this.timer);
          this.agentState = "通话中";
          this.timerString = "00:00:00";
          this.timer = setInterval(() => {
            this.timerString = this.computeTimeDiff(
              new Date().getTime() - origin
            );
          }, 1000);
          break;

        case "CB_HANGUP":
          this.writeLog("-------> 挂机放音 <-------");
          window.sessionStorage.removeItem("popScreenData");
          this.playHangupMedia();
          break;

        case "CB_HOLD":
          this.CtiAgentBarStatue.status.hold.call(this);
          window.sessionStorage["state"] = data.event;
          this.stopPlayRingMedia();
          break;

        case "CB_UNHOLD":
          this.CtiAgentBarStatue.status.unhold.call(this);
          window.sessionStorage["state"] = data.event;
          this.stopPlayRingMedia();
          break;

        case "CB_MAKECALL":
          if (data.data.code !== 200) {
            this.$Message.warning({ content: data.data.message, duration: 3 });
          }
          this.stopPlayRingMedia();
          break;

        case "CB_LISTENCALL":
          if (data.data.code !== 200) {
            this.$Message.warning({ content: data.data.message, duration: 3 });
          }
          this.stopPlayRingMedia();
          break;

        case "CB_THREEWAY":
          if (data.data.code === 200) {
            this.showThreeway = false;
          }
          break;
        case "CB_KICKOUT":
          // this.$Modal.error({
          //   title: "您的电话账号已在其他地方登陆，本地已强制下线！",
          // });
          this.$emit("phoneLogon", false);
          this.handleAgentBarBtnClick('zhedie')
          break;
        case "CB_CONSULT":
          this.$Modal.success({
            title: "电话正在咨询转接中！",
          });
          break;
      }
    },
    handleACWChange(val) {
      this.progressOverTime = val;
      localStorage.progressOverTime = this.progressOverTime;
    },
    loadICETimeout() {
      var item = localStorage.getItem("iceTimeout");
      if (null == item) {
        item = 500;
      }
      this.initConfig.iceCheckTimeout = item;
      this.handleICETimeoutChange(item);
    },
    handleICETimeoutChange(val) {
      this.initConfig.iceCheckTimeout = val;
      localStorage.setItem("iceTimeout", val);
    },
    loadRegisterExpire() {
      var item = localStorage.getItem("registerExpire");
      if (null == item) {
        item = 600;
      }
      this.initConfig.register_expire = item;
      // this.handleRegisterExpireChange(item);
    },
    handleRegisterExpireChange(val) {
      this.initConfig.register_expire = val;
      localStorage.setItem("registerExpire", val);
    },
    getBindNo() {
      CtiAgentBar.getAlreadyBind().then((res) => {
        this.agentNo = res;
        this.login();
      });
    },
    getAfterHangupStatus() {
      CtiAgentBar.getAfterHangupStatus().then((res) => {
        this.afterHangupStatus = res;
      });
    },
    setAfterHangupStatus(val) {
      if (!val) {
        val = "none";
      }
      CtiAgentBar.setAfterHangupStatus(val);
    },
    getPhoneTypeStr() {
      //先去localstorage中检查phoneTypeStr，如果不存在（第一次使用该电脑），则默认为hard模式，如果存在则取该值
      this.phoneTypeStr =
        localStorage.phoneTypeStr === undefined
          ? "webrtc"
          : localStorage.phoneTypeStr;
      this.config.enableWebRTC =
        this.phoneTypeStr === "webrtc" ? "true" : "false";
      this.writeLog("phoneType:::::::::::::::::::::::" + this.phoneTypeStr);
    },
    setPhoneTypeStr(type) {
      sessionStorage.removeItem("state");
      localStorage.originType = localStorage.phoneTypeStr;
      localStorage.phoneTypeStr = type;
      if (type === "hard") {
        this.initConfig.enableWebRTC = "false";
      } else {
        this.initConfig.enableWebRTC = "true";
      }
      if (
        localStorage.originType !== "double" &&
        localStorage.originType !== "zkdouble" &&
        localStorage.originType !== "fdouble"
      ) {
        this.logout();
      }
      if (type === "double") {
        CtiAgentBar.doubleInit(this.initConfig).then((res) => {
          if (res.code !== 200) {
            this.$Message.error(res.msg);
            this.phoneTypeStr = localStorage.originType;
            localStorage.phoneTypeStr = localStorage.originType;
          } else {
            sessionStorage.state = "CB_READY";
            this.hangupDisable = false;
            this.makeCallDisable = false;
          }
        });
      } else if (type === "zkdouble") {
        CtiAgentBar.ZKdoubleInit(this.initConfig).then((res) => {
          if (res.code !== 200) {
            this.$Message.error(res.msg);
            this.phoneTypeStr = localStorage.originType;
            localStorage.phoneTypeStr = localStorage.originType;
          } else {
            sessionStorage.state = "CB_READY";
            this.hangupDisable = false;
            this.makeCallDisable = false;
          }
        });
      } else if (type === "fdouble") {
        CtiAgentBar.FdoubleInit(this.initConfig).then((res) => {
          if (res.code !== 200) {
            this.$Message.error(res.msg);
            this.phoneTypeStr = localStorage.originType;
            localStorage.phoneTypeStr = localStorage.originType;
          } else {
            sessionStorage.state = "CB_READY";
            this.hangupDisable = false;
            this.makeCallDisable = false;
          }
        });
      } else {
        this.hangupDisable = true;
        this.makeCallDisable = true;
        this.init();
      }
    },
    loadAutoAnswer() {
      var item = localStorage.getItem("autoAnswer");
      if (null == item) {
        item = false;
      }
      this.sip.autoAnswer = "true" === item;
      this.setAutoAnswer(item);
    },
    setAutoAnswer(status) {
      localStorage.setItem("autoAnswer", status);
      CtiAgentBar.setWebRTCAutoAnswer(status);
    },
    startSip() {
      CtiAgentBar.sipInit();
    },
    getCallInToMobile() {
      CtiAgentBar.getCallInMobileState().then((res) => {
        this.callInToMobile = res;
      });
    },
    setCallInToMobile(val) {
      CtiAgentBar.setCallInMobileState(val).then((res) => {
        if (res) {
          this.$Message.success("设置呼入转手机成功！");
        } else {
          this.$Message.error("设置呼入转手机失败！");
        }
      });
    },
    //播放挂机铃声
    playHangupMedia() {
      const _this = this;
      var hangupAudio = document.getElementById("hangupMediaAudioId");
      if (!hangupAudio) {
        hangupAudio = document.createElement("audio");
        hangupAudio.id = "hangupMediaAudioId";
        hangupAudio.hidden = true;
        hangupAudio.src = "wav/hangup.wav";
        document.body.appendChild(hangupAudio);
      }
      hangupAudio.play();
    },
    //播放来电振铃
    playRingMedia() {
      const _this = this;
      _this.stopPlayRingMedia();
      var ringAudio = document.createElement("audio");
      ringAudio.id = "ringMediaAudioId";
      ringAudio.hidden = true;
      ringAudio.src = "wav/ring.wav";
      ringAudio.loop = "loop";
      document.body.appendChild(ringAudio);
      ringAudio.play();
    },
    //停止播放来电振铃
    stopPlayRingMedia() {
      const _this = this;
      var ringAudio = document.getElementById("ringMediaAudioId");
      if (ringAudio) {
        document.body.removeChild(ringAudio);
      }
    },
    selectInDevice(deviceId) {
      CtiAgentBar.setInDevice(deviceId);
    },
    selectOutDevice(deviceId) {
      CtiAgentBar.setOutDevice(deviceId);
    },
    //初始化方法
    init() {
      CtiAgentBar.getToken(this.initConfig).then((res) => {
        if (200 !== res.code) {
          this.$Message.error("登录失败");
          return;
        }
        CtiAgentBar.getAvailableTypes(this.initConfig).then((res) => {
          this.phoneTypeStrList = res;
          this.phoneTypeStr =
            localStorage.phoneTypeStr === undefined
              ? "webrtc"
              : localStorage.phoneTypeStr;
          if (this.phoneTypeStrList.length === 0) {
            this.$Message.error("无可用模式，请联系管理员！");
          } else if (this.phoneTypeStrList.indexOf(this.phoneTypeStr) === -1) {
            //不支持本地记录的类型
            this.phoneTypeStr = this.phoneTypeStrList[0];
            localStorage.phoneTypeStr = this.phoneTypeStr;
          }
          this.initConfig.enableWebRTC =
            this.phoneTypeStr === "webrtc" ? "true" : "false";
          this.writeLog("phoneType:::::::::::::::::::::::" + this.phoneTypeStr);
          CtiAgentBar.destroy();
          if (
            this.phoneTypeStr !== "double" &&
            this.phoneTypeStr !== "zkdouble" &&
            this.phoneTypeStr !== "fdouble"
          ) {
            CtiAgentBar.init(
              this.initConfig,
              this.initCallback,
              this.webRTCCallback
            ).then((res) => {
              if (res.code !== 200) {
                this.$Message.error(res.msg);
              } else {
                //判断用户是否只有webrtc模式
                if (
                  this.phoneTypeStrList.length === 1 &&
                  this.phoneTypeStrList[0] === "webrtc"
                ) {
                  //获取绑定的分机号
                  CtiAgentBar.getAlreadyBind().then((res) => {
                    this.agentNo = res;
                    var regExp = new RegExp("^\\d{6}$");
                    if (regExp.test(res)) {
                      this.login();
                    } else {
                      this.$Modal.error({
                        title: "登录电话条失败：未分配可用分机号",
                        width: 350,
                      });
                    }
                  });
                }
                this.getAfterHangupStatus();
              }
            });
          } else {
            sessionStorage.state = "CB_READY";
            this.hangupDisable = false;
            this.makeCallDisable = false;
          }
        });
      });
      if (this.initConfig.enableWebRTC) {
        CtiAgentBar.getInDeviceList().then((list) => {
          this.inDeviceList = list;
        });
        CtiAgentBar.getOutDeviceList().then((list) => {
          this.outDeviceList = list;
        });
      }
    },
    showNetworkState() {
      let timeStamp = 0;
      let byteSent = 0;
      let byteReceived = 0;
      let codecSent = "";
      let codecReceived = "";
      let lossSent = 0;
      let lossReceived = 0;
      let packetsSent = 0;
      let packetsReceived = 0;
      let levelSent = 0;
      let levelReceived = 0;
      let delay = 0;
      let lossReceivedDiff = 0;
      let packetsReceivedDiff = 0;
      let packetsSentDiff = 0;
      let lossSentDiff = 0;
      let time = new Date().Format("HH:mm:ss");
      if (this.peerConnection) {
        let agent = navigator.userAgent.toLowerCase();
        let Chrome = /(chrome)\/([\w.]+)/;
        if (Chrome.exec(agent)) {
          this.peerConnection.getStats((stats) => {
            stats.result().forEach((report) => {
              if (0 === timeStamp) {
                timeStamp = Number(report.timestamp);
              }
              if (report.id.startsWith("ssrc")) {
                if (report.id.endsWith("send")) {
                  report.names().forEach((name) => {
                    if ("googCodecName" === name) {
                      codecSent = report.stat(name);
                    } else if ("packetsLost" === name) {
                      lossSent = report.stat(name);
                    } else if ("bytesSent" === name) {
                      byteSent = report.stat(name);
                    } else if ("audioInputLevel" === name) {
                      levelSent = report.stat(name);
                    } else if ("packetsSent" === name) {
                      packetsSent = report.stat(name);
                    }
                  });
                } else {
                  report.names().forEach((name) => {
                    if ("googCodecName" === name) {
                      codecReceived = report.stat(name);
                    } else if ("packetsLost" === name) {
                      lossReceived = report.stat(name);
                    } else if ("bytesReceived" === name) {
                      byteReceived = report.stat(name);
                    } else if ("audioOutputLevel" === name) {
                      levelReceived = report.stat(name);
                    } else if ("googCurrentDelayMs" === name) {
                      delay = report.stat(name);
                    } else if ("packetsReceived" === name) {
                      packetsReceived = report.stat(name);
                    }
                  });
                }
              }
            });
            if (0 !== this.networkState.lastTimeStamp) {
              //计算差值
              let secDiff =
                (timeStamp - this.networkState.lastTimeStamp) / 1000;
              this.networkState.byteSentPs =
                (byteSent - this.networkState.lastBytesSent) / secDiff;
              this.networkState.byteReceivedPs =
                (byteReceived - this.networkState.lastBytesReceived) / secDiff;

              packetsSentDiff = packetsSent - this.networkState.lastPacketsSent;
              lossSentDiff = lossSent - this.networkState.lastLossSent;
              if (0 !== packetsSentDiff) {
                this.networkState.lossSentRate = lossSentDiff / packetsSentDiff;
              } else {
                this.networkState.lossSentRate = 0;
              }

              packetsReceivedDiff =
                packetsReceived - this.networkState.lastPacketsReceived;
              lossReceivedDiff =
                lossReceived - this.networkState.lastLossReceived;
              if (0 !== packetsReceivedDiff) {
                this.networkState.lossReceivedRate =
                  lossReceivedDiff / packetsReceivedDiff;
              } else {
                this.networkState.lossReceivedRate = 0;
              }
            } else {
              this.networkState.lossReceivedRate = 0;
              this.networkState.lossSentRate = 0;
              this.networkState.byteReceivedPs = 0;
              this.networkState.byteSentPs = 0;
            }
            //历史赋值
            this.networkState.lastTimeStamp = timeStamp;
            this.networkState.lastBytesSent = byteSent;
            this.networkState.lastBytesReceived = byteReceived;
            this.networkState.lastLossSent = lossSent;
            this.networkState.lastLossReceived = lossReceived;
            this.networkState.lastPacketsSent = packetsSent;
            this.networkState.lastPacketsReceived = packetsReceived;
            this.networkState.delay = delay;
            this.networkState.codecSent = codecSent;
            this.networkState.codecReceived = codecReceived;
            this.networkState.levelSent = levelSent;
            this.networkState.levelReceived = levelReceived;
            // console.log("===============================");
            // console.log("当前时间:" + timeStamp);
            // console.log("每秒发送字节:" + this.networkState.byteSentPs);
            // console.log("每秒接收字节:" + this.networkState.byteReceivedPs);
            // console.log("发送编码:" + this.networkState.codecSent);
            // console.log("接收编码:" + this.networkState.codecReceived);
            // console.log("发送丢包率:" + this.networkState.lossSentRate * 100 + '%');
            // console.log("接收丢包率:" + this.networkState.lossReceivedRate * 100 + '%');
            // console.log("发送音量:" + this.networkState.levelSent);
            // console.log("接收音量:" + this.networkState.levelReceived);
            // console.log("延迟:" + this.networkState.delay);
            // console.log("发送丢包差值:" + lossSentDiff);
            // console.log("发送总包差值:" + packetsSentDiff);
            // console.log("接收丢包差值:" + lossReceivedDiff);
            // console.log("接收总包差值:" + packetsReceivedDiff);
            // console.log("===============================");
          });
        }
      } else {
        this.networkState.delay = 0;
        this.networkState.lossReceivedRate = 0;
        this.networkState.lossSentRate = 0;
        this.networkState.byteReceivedPs = 0;
        this.networkState.byteSentPs = 0;
      }
      this.networkState.lossReceivedRateList.push({
        time: time,
        value: parseFloat(
          (this.networkState.lossReceivedRate * 100).toFixed(2)
        ),
      });
      this.networkState.lossSentRateList.push({
        time: time,
        value: parseFloat((this.networkState.lossSentRate * 100).toFixed(2)),
      });
      this.networkState.delayList.push({
        time: time,
        value: this.networkState.delay,
      });
      // this.delayChart.changeData(this.networkState.delayList);
      // this.lossSentRateChart.changeData(this.networkState.lossSentRateList);
      // this.lossReceivedRateChart.changeData(this.networkState.lossReceivedRateList);
    },
    initChart() {
      let delayData = [];
      let lossSentRateData = [];
      let lossReceivedData = [];
      lossSentRateData.push({ time: "", value: 0 });
      lossReceivedData.push({ time: "", value: 0 });
      delayData.push({ time: "", value: 0 });
      this.delayChart = new G2Plot.Line(document.getElementById("delayChart"), {
        title: {
          visible: true,
          text: "延迟曲线图",
        },
        animation: false,
        // forceFit: true,
        width: 350,
        height: 300,
        padding: [50, 20, 50, 30],
        xField: "time",
        yField: "value",
        smooth: false,
        delayData,
        meta: {
          value: {
            alias: "延迟",
          },
        },
        xAxis: {
          type: "timeCat",
          tickCount: 5,
        },
      });
      this.delayChart.render();
      this.lossSentRateChart = new G2Plot.Line(
        document.getElementById("lossSentRateChart"),
        {
          title: {
            visible: true,
            text: "发送丢包率曲线图",
          },
          animation: false,
          // forceFit: true,
          width: 350,
          height: 300,
          padding: [50, 20, 50, 40],
          xField: "time",
          yField: "value",
          smooth: false,
          lossSentRateData,
          meta: {
            value: {
              alias: "发送丢包率",
              formatter: (val) => {
                return `${val} %`;
              },
            },
          },
          xAxis: {
            type: "timeCat",
            tickCount: 5,
          },
          yAxis: {
            max: 100,
          },
        }
      );
      this.lossSentRateChart.render();
      this.lossReceivedRateChart = new G2Plot.Line(
        document.getElementById("lossReceivedRateChart"),
        {
          title: {
            visible: true,
            text: "接收丢包率曲线图",
          },
          animation: false,
          // forceFit: true,
          width: 350,
          height: 300,
          padding: [50, 20, 50, 40],
          xField: "time",
          yField: "value",
          smooth: false,
          lossReceivedData,
          meta: {
            value: {
              alias: "接收丢包率",
              formatter: (val) => {
                return `${val} %`;
              },
            },
          },
          xAxis: {
            type: "timeCat",
            tickCount: 5,
          },
          yAxis: {
            max: 100,
          },
        }
      );
      this.lossReceivedRateChart.render();
      // this.delayChart.changeData(lossSentRateData);
      this.lossSentRateChart.changeData(lossSentRateData);
      this.lossReceivedRateChart.changeData(lossSentRateData);
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {});
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = null;
    this.timerString = "00:00:00";
  },
};
</script>

<style scoped>
.text{
   min-height: 0;
   overflow-y:hidden;
}
</style>
