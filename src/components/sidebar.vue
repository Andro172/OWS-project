<template>
  <div class="sidebar grad">

    <div class="m-lg-3 m-md-1 askHeight">
      <b-btn v-if="LoggedIn" block variant="success" v-b-modal.qModal title="Ask anything!">
        <icon icon="plus" class="mr-1"/> Ask Something
      </b-btn>
      <b-btn v-else block variant="success" @click.stop="OpenLoginModal" title="Ask anything!">
        <icon icon="plus" class="mr-1"/> Ask Something
      </b-btn>
    </div>
    <hr class="line">

    <div class="my-4 grayC listCont">
      <div class="itemWrap text-left" @click="GoTo('/categories')">
        <span>
          <icon icon="list" class="mr-1"/>
          Categories
        </span>
      </div>

      <div class="itemWrap text-left" @click="GoTo('/users')">
        <span>
          <icon icon="users" class="mr-1"/>
          Users
        </span>
      </div>

      <div class="itemWrap text-left" @click="GoTo('/how_it_works')">
        <span>
          <icon icon="question" class="mr-1"/>
          How it works
        </span>
      </div>
    </div>
    <hr class="line">

    <div class="my-4 text-left">
      <div class="numWrap m-2">
        <div class="ml-2">Questions</div>
        <h2 class="ml-2">55</h2>
      </div>
      <br>
      <div class="numWrap m-2">
        <div class="ml-2">Users</div>
        <h2 class="ml-2">13</h2>
      </div>
    </div>

    <div>
      <icon @click="scrollUp()" ref="up" icon="chevron-up" size="2x" class="upIcon"></icon>
    </div>

    <b-modal lazy 
              title="Ask Question"
              ref="qModal" 
              id="qModal" 
              centered size="md" 
              scrollable
              hide-footer
              body-class="m-0 p-0 grad white-color"
              @hidden="resetQuestionInfo()">

              <div v-if="!Loading" class="m-3">
                <b-form @submit.prevent="handleAskQuestion">
                  <b-form-input id="q" v-model="qForm.question" type="text" placeholder="Your Question" required></b-form-input>
                  <br>
                  <label for="password">Select Category</label>
                  <b-form-select v-model="qForm.category" :options="$store.state.allCategories" size="sm" required></b-form-select>
                  <br><br>
                  <b-form-textarea
                        id="desc"
                        v-model="qForm.description"
                        placeholder="Describe Your Question..."
                        rows="4"
                        max-rows="4"
                        required>
                    </b-form-textarea>

                  <hr class="line">
                  <div class="text-center">
                    <b-btn variant="success" type="submit" pill class="ml-2">Ask</b-btn>
                  </div>
                  
                </b-form>
              </div>

              <div v-else class="text-center py-5">
                <p>asking in...</p><b-spinner variant="info" label="Spinning"></b-spinner>
              </div>

          
      </b-modal>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data(){
    return {
      modalLoading: false,
      qForm:{
        question: null,
        category: null,
        description: null
      },
      error: null
    }
  },
  methods:{
    GoTo(url){
      this.$router.push(url);
    },
    scrollUp(){
      window.scrollTo(0,0);
    },
    OpenLoginModal(){
      this.$emit('login');
    },
    resetQuestionInfo(){
      this.qForm.question = null;
      this.qForm.category = null,
      this.qForm.description = null;
    },
    handleAskQuestion(){
      this.modalLoading = true;
      let newQ = {
        category: this.qForm.category,
        question: this.qForm.question,
        description: this.qForm.description,
        profile: require("../assets/avatar.jpeg"),
        timestamp: Date.now(),
        answersNum: 0,
        views: 0
      }
      this.$store.commit("addQuestion", newQ);
      this.modalLoading = false;
      this.$refs.qModal.hide();
    },
    UPAutoHide(val){
      if(val){
        this.$refs.up.style['display'] = 'block';
      }
      else{
        this.$refs.up.style['display'] = 'none';
      }
    }
  },
  computed:{
    LoggedIn(){
      return this.$store.state.isLoggedIn;
    },
    Loading(){
      return this.modalLoading;
    },
    ifError(){
      return this.error
    }
  },
  created(){
    let ticking = false;
    window.onscroll = () => {
      if(window.pageYOffset >= 300){
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.UPAutoHide(true);
            ticking = false;
          });

          ticking = true;
        }
      }
      else{
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.UPAutoHide(false);
            ticking = false;
          });

          ticking = true;
        }
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidebar{
  height: 100%;
  width: 100%;
  border-top: 0.1px solid white;
}

.askHeight{
  height: 80px;
}

.grayC{
  color: white;
}
.itemWrap{
  width: 80%;
  margin: auto;
  padding: 10px;
  cursor: pointer;
  word-wrap:break-word;
}
.itemWrap:hover{
  border-left: 10px solid #D77732;
  background: #e8e8e8;
  color: black;
}

.numWrap{
  border-left: 10px solid #D77732;
  color: white;
}

.upIcon{
  position: fixed;
  bottom: 30px;
  display: none;
  left: 6rem;
  color: white;
  cursor: pointer;
  transition: 0.6s;
}
.upIcon:hover{
  color: #d77732;
}
</style>
