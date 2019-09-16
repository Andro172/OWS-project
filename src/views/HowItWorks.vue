<template>
  <div>
    <div class="pt-3 gray-bg">
      <b-row class="text-left m-2">
        <b-col>
          <h3>How It Works</h3>
        </b-col>
      </b-row>
      <b-row class="grayBox m-0 p-0 text-left" style="border-left:0;border-right:0;">
        <b-col>
          <div class="m-2">
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(0)}" @click="active = 0;">
              Questions
            </span>
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(1)}" @click="active = 1">
              Points
            </span>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-row v-if="active === 0" class="justify-content-start text-left m-0 p-0 mt-5 text-center">
      <b-col class="col-auto col-sm-7 mb-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </b-col>
    </b-row>

    <b-row v-if="active === 1" class="justify-content-start text-left m-0 p-0 mt-5 text-center">
      <b-col class="col-auto col-sm-7 mb-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </b-col>
    </b-row>
      
  </div>
</template>

<script>
export default {
  name: "HowItWorks",
  data(){
    return {
      active: 0
    }
  },
  methods:{
    isActive(val){
      return val === this.active;
    }
  },
  computed:{
  },
  created(){
  },
  beforeDestroy(){
  },
  mounted(){
    
  }
};
</script>

<style scoped>
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
</style>
