<template>
  <div>
    <div class="pt-3 gray-bg">
      <b-row class="text-left m-2">
        <b-col>
          <h3>Categories</h3>
        </b-col>
        <b-col>
            <b-form-input size="sm"  placeholder="Find..." style="width:auto; float:right;"></b-form-input>
        </b-col>
      </b-row>
      <b-row class="grayBox m-0 p-0 text-left" style="border-left:0;border-right:0;">
        <b-col>
          <div class="m-2">
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(0)}" @click="active = 0;">
              Name
            </span>
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(1)}" @click="active = 1">
              Most Popular
            </span>
          </div>
        </b-col>
      </b-row>
    </div>

    <b-row v-if="active === 0" class="justify-content-start text-left m-0 p-0 mt-5 text-center">
      <b-col v-for="(cat,index) in NameCat" :key="index" class="col-auto col-sm-3 mb-3">
        <h5 class="gradColor1 bold pointer" @click="GoHome(cat)">{{cat}}</h5>
      </b-col>
    </b-row>

    <b-row v-if="active === 1" class="justify-content-start text-left m-0 p-0 mt-5 text-center">
      <b-col v-for="(cat,index) in PopularCat" :key="index" class="col-auto col-sm-3 mb-3">
        <h5 class="gradColor2 bold pointer">{{cat}}</h5>
      </b-col>
    </b-row>
      
  </div>
</template>

<script>
export default {
  name: "Categories",
  data(){
    return {
      categories: [],
      active: 0
    }
  },
  methods:{
    GoHome(cat){
      this.$store.commit('setCategory', cat);
      this.$router.push("/");
    },
    GetCategories(){
      let cat = this.$store.state.allCategories;
      this.categories = cat.slice(1,cat.length);
    },
    isActive(val){
      return val === this.active;
    }
  },
  computed:{
    NameCat(){
      return this.categories.sort((a,b) => {
        let x = a.toLowerCase();
        let y = b.toLowerCase();
        if(x < y){
          return -1
        }
        else if(x > y){
          return 1
        }
        return 0;
      });
    },
    PopularCat(){
      return this.categories.sort((a,b) => {
        return b.points - a.points;
      });
    }
  },
  created(){
    this.GetCategories();
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
