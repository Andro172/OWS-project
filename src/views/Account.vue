<template>
  <div class="gray-bg pb-3">
    <div class="text-left head">
      <b-row class="justify-content-center p-0 m-0">
        <b-col class=" col-10 col-md-4 mt-2 mb-2">
          <b-img  style="float:left;margin-right:30px;" :src="$store.state.defaultAvatar" alt="profile" fluid rounded="circle" width="70"></b-img>
          <div>
            <h5 class="bold mb-0">{{User.username}}</h5>
            <p class="mb-0">Level 3</p>
            <div><icon icon="map-marker-alt"></icon> address</div>
          </div>
        </b-col>
        <b-col class="col-10 col-md-4 mt-2 mb-2">
          <div>
            <b-badge variant="warning" style="color:white;background:#d77732;">Profession</b-badge>
            <br>
            <h2 class="gradColor1">239 <small>points</small></h2>
          </div>
        </b-col>
      </b-row>

      <b-row class="BT-border m-0 p-0 text-left" style="border-left:0;border-right:0;">
        <b-col>
          <div class="m-2">
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(0)}" @click="active = 0;">
              Questions
            </span>
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(1)}" @click="active = 1">
              Answers
            </span>
          </div>
        </b-col>
      </b-row>
    </div>
    <hr class="line m-0 p-0">


    <div v-if="active === 0" class="ml-5 mr-5 text-left" id="qWrap">
      <b-row v-for="(q,index) in Questions" :key="index" class="B-border pt-3">
        <b-col>
          <h6 class="bold pointer" @click="ViewQuestion(q)">{{q.question}}?</h6>
          <div class="descColor">{{q.description}}</div>
          <div class="mt-3 mb-2">
            <b-img :src="q.profile" alt="profile" fluid rounded="circle" height="30" width="30"></b-img>
            <span class="ml-3 descColor">
              {{FormatDate(q.timestamp)}}
            </span>
          </div>
        </b-col>
        <b-col class="col-3 text-center">
          <div class="iconClass" title="Views">
            <icon :icon="{ prefix: 'far', iconName: 'eye' }" class="mr-3 gradColor2"></icon>
            <span>{{q.views}}</span>
          </div>
          <div class="iconClass" title="Answers">
            <icon icon="comments" class="mr-3 gradColor1"></icon>
            <span>{{q.answersNum}}</span>
          </div>
          <div class="mt-3">
            <b-badge variant="warning" style="color:white;background:#d77732;">{{q.category}}</b-badge>
          </div>
        </b-col>
      </b-row>
    </div>



    <div v-if="active === 1" class="ml-5 mr-5 text-left" id="qWrap">
      <b-row v-for="(q,index) in Answers" :key="index" class="B-border pt-3">
        <b-col>
          <h6 class="bold pointer" @click="ViewQuestion(q)">RE:{{q.question}}?</h6>
          <div class="mt-3 mb-2">
            <b-img :src="q.profile" alt="profile" fluid rounded="circle" height="30" width="30"></b-img>
            <span class="ml-3 descColor">
              {{FormatDate(q.timestamp)}}
            </span>
          </div>
          <div>RE:</div>
          <div class="descColor ml-md-5 mb-2">{{q.answer}}</div>
        </b-col>
        <b-col class="col-3 text-center">
          <div class="iconClass" title="Views">
            <icon :icon="{ prefix: 'far', iconName: 'eye' }" class="mr-3 gradColor2"></icon>
            <span>{{q.views}}</span>
          </div>
          <div class="iconClass" title="Answers">
            <icon icon="comments" class="mr-3 gradColor1"></icon>
            <span>{{q.answersNum}}</span>
          </div>
          <div class="mt-3">
            <b-badge variant="warning" style="color:white;background:#d77732;">{{q.category}}</b-badge>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return {
      active: 0,
      questions: [],
      answers: [],
      user: null
    }
  },
  methods:{
    ViewQuestion(q){
      this.$router.push({ name: "Question", params: { question: q } });
    },
    FormatDate(date){
      if(!date){
          return "";
      }
      let d = new Date(date)
      let dstr = d.toDateString();
      return dstr.slice(dstr.indexOf(" "),dstr.lastIndexOf(" "))
    },
    isActive(val){
      return val === this.active;
    },
    GetQuestions(){
      for(let i = 0;i < 4; ++i){
        this.questions.push({
          category: this.$store.state.allCategories[i + 1],
          question: "Test Question",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"+
          "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "+
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."+
          " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."+
          " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          profile: require("../assets/avatar.jpeg"),
          timestamp: Date.now(),
          answersNum: 0,
          views: 0
        })
      }
    },
    GetAnswers(){
      for(let i = 0;i < 4; ++i){
        this.answers.push({
          category: this.$store.state.allCategories[i + 1],
          question: "Test Question",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"+
          "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "+
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."+
          " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."+
          " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"+
          "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "+
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."+
          " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."+
          " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          profile: require("../assets/avatar.jpeg"),
          timestamp: Date.now(),
          answersNum: 0,
          views: 0
        })
      }
    }
  },
  computed:{
    User(){
      return this.user;
    },
    Questions(){
      return this.questions;
    },
    Answers(){
      return this.answers;
    }
  },
  created(){
  },
  beforeDestroy(){
  },
  mounted(){
    let user = this.$route.params.user;
    if(user){
      this.user = user;
    }
    else{
      this.user = this.$store.state.user;
    }

    this.GetQuestions();
    this.GetAnswers();
  }
};
</script>

<style scoped>

.numWrap{
  border-left: 10px solid #D77732;
}
.head{
  background-color: #eeeeee;
}

.itemWrap{
  margin: auto;
  padding: 5px;
  cursor: pointer;
  word-wrap:break-word;
}
.itemWrap:hover{
  border-bottom: 5px solid #D77732;
  color: black;
}

.itemWrapActive{
  border-bottom: 5px solid #D77732;
  color: black;
}

.BT-border{
  border-bottom: 1px solid #E2E2E2;
  border-top: 1px solid #E2E2E2;
}

.descColor{
  color: #5E5E5E;
}

.B-border{
  border-bottom: 1px solid #E2E2E2;
}

.iconClass{
  font-size: 1.5rem;
}

#qWrap .row:nth-of-type(even) {
    background-color: #eeeeee;
}
</style>
