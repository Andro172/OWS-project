<template>
    <div class="text-left">
      <div v-if="Question">
        <icon @click="$router.push('/')" icon="angle-double-left" class="descColor pointer abs mt-2 ml-2" size="2x" title="Go Back"></icon>
        <div class="ml-4 mt-4">
          <h3 class="bold orange ml-5">
            {{qObj.question}}?
          </h3>
          <div class="ml-5">
            <b-img :src="qObj.profile" alt="profile" fluid rounded="circle" height="30" width="30"></b-img>
            <span class="ml-3 descColor">
              {{FormatDate(qObj.timestamp)}}
            </span>
            <icon :icon="{ prefix: 'far', iconName: 'eye' }" class="gradColor2 ml-5 mr-2"></icon>
            <span class="gradColor2">{{qObj.views}}</span>
          </div>
        </div>
        <hr class="line">

        <div class="ml-3 ml-md-5">
          <p class="ml-md-5 mr-md-5 maxW">
            {{qObj.description}}
          </p>

          <hr class="line">

          <b-row class="ml-md-5 maxW mr-md-5 mr-1">
            <b-col class="col-sm-8">
                <label for="answerent">Add your answer</label>
                <b-link class="link" style="float:right;" @click="showAnswers = !showAnswers">{{Answers.length}} answers</b-link>
                <b-form-textarea
                    id="answer"
                    v-model="answer"
                    placeholder="Your answer..."
                    rows="3"
                    max-rows="3"
                    >
                </b-form-textarea>
                <br>
                <b-btn variant="success" @click="AddAnswer">Add Answer</b-btn>
                <br><br>
            </b-col>
          </b-row>

          <b-row v-if="showAnswers" v-for="(answer,index) in Answers" :key="index" class="mb-3 mt-3 ml-2 mr-2 grayBox maxW">
            
              
            <b-col class="text-left p-0" >
              <span><b-img :src="answer.profile" alt="profile" fluid rounded="circle" class="avatar m-2"></b-img></span>
                <span class="mt-2 orange bold">{{answer.username}}</span>
                <b-col style="word-wrap:break-word;" class="m-2 col-md-9">
                    {{answer.txt}}
                </b-col>
                <b-col style="float:right;" class="col-10 col-md-3 text-right mb-3">
                  <icon @click="SetLike(true)" icon="thumbs-up" class="thumbsUp pointer mr-4" title="Agree"></icon>
                  <icon @click="SetLike(false)" icon="thumbs-down" class="thumbsDown pointer ml-2 mr-4"  title="Disagree"></icon>
                </b-col>
            </b-col>
          </b-row>
        </div>
      </div>
      <div v-else>
        <h5 class="m-5">error getting question</h5>
      </div>
  </div>
</template>

<script>
export default {
  name: "Question",
  data(){
    return {
      qObj: null,
      answer: null,
      answers: [],
      showAnswers: false
    }
  },
  methods:{
    SetLike(val){
      console.log("answer like response", val);
    },
    FormatDate(date){
      if(!date){
          return "";
      }
      let d = new Date(date)
      let dstr = d.toDateString();
      return dstr.slice(dstr.indexOf(" "),dstr.lastIndexOf(" "))
    },
    AddAnswer(){
      console.log("answer ---", this.answer)
    },
    AddAnswers(){
      for(let i = 0;i < 5; ++i){
        this.answers.push({
          username: "User",
          txt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,"+
          "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "+
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."+
          " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."+
          " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          profile: require("../assets/avatar.jpeg"),
          timestamp: Date.now()
        })
      }
    }
  },
  computed:{
    Question(){
      return this.qObj;
    },
    Answers(){
      return this.answers;
    }
  },
  created(){
    this.AddAnswers();
  },
  beforeDestroy(){
    sessionStorage.removeItem('qObj');
  },
  mounted(){
    if(this.$route.params.question){
      this.qObj = this.$route.params.question;
      sessionStorage.setItem('qObj', JSON.stringify(this.qObj));
    }
    else if(sessionStorage.getItem('qObj')){
      this.qObj = JSON.parse(sessionStorage.getItem('qObj'));
    }
  }
};
</script>

<style scoped>

.descColor{
  color: #5E5E5E;
}

.B-border{
  border-bottom: 1px solid #E2E2E2;
}

.iconClass{
  font-size: 1.5rem;
}

.descColor{
  color: #5E5E5E;
}

.ans-text{
    max-height: 400px;
    overflow-y: auto;
}

.thumbsUp{
  font-size: 1.3rem;
  color: #5E5E5E;
}
.thumbsUp:hover{
  color: #D77732;
}

.thumbsDown{
  font-size: 1.3rem;
  color: #5E5E5E;
}
.thumbsDown:hover{
  color: #4e4376;
}

.maxW{
  max-width: 700px;
}
</style>
