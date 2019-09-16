<template>
  <div class="text-left pb-3">
    <Category class="m-0"></Category>
    <div class="ml-5 mr-5" id="qWrap">
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
  </div>
</template>

<script>
import Category from "../components/category.vue";
export default {
  name: "home",
  data(){
    return {
      category: null,
      questions: []
    }
  },
  components:{
    Category
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
    GetQuestions(val){
      this.questions = [];
      if(val === "All"){
        for(let i = 0;i < 4; ++i){
          let cat;
          switch(i){
            case 0: 
              cat = this.$store.state.allCategories[4];;
              break;
            case 1: 
              cat = this.$store.state.allCategories[7];
              break;
            case 2: 
              cat = this.$store.state.allCategories[2];;
              break;
            case 3: 
              cat = this.$store.state.allCategories[9];;
              break;
          }
          this.questions.push({
            category: cat,
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

        this.$store.state.newQuestions.forEach(q => {
          this.questions.unshift(q);
        });
        return;
      }

      for(let i = 0;i < 4; ++i){
        this.questions.push({
          category: val,
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

      this.$store.state.newQuestions.forEach(q => {
        if(q.category === val){
          this.questions.unshift(q);
        }    
      });
    }
  },
  computed:{
    Questions(){
      return this.questions;
    }
  },
  created(){

  },
  mounted(){
    this.category = this.$store.state.category;
    this.GetQuestions(this.category);
    console.log("heree",this.$store.state.category)
  },
  watch:{
    '$store.state.category': function(val){
      console.log(val,"category")
      this.category = val;
      this.GetQuestions(val);
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

#qWrap .row:nth-of-type(even) {
    background-color: #eeeeee;
}

</style>
