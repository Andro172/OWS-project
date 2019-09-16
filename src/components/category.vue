<template>
  <div class="gray-bg">
    <div class="pt-3">
      <b-row class="text-left m-2">
        <b-col>
          <h3>{{category}} Questions</h3>
        </b-col>
        <b-col>
            <span class="mr-2">Filter by</span>
            <b-form-select v-model="category" :options="categories" size="sm" class="w-50"></b-form-select>
        </b-col>
      </b-row>
      <b-row class="grayBox m-0 p-0 text-left" style="border-left:0;border-right:0;">
        <b-col>
          <div class="m-2">
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(0)}" @click="active = 0;">
              Latest
            </span>
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(1)}" @click="active = 1">
              Most Viewed
            </span>
            <span :class="{ 'itemWrap m-2': true, 'itemWrapActive': isActive(2)}" @click="active = 2">
              Unanswered
            </span>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "category",
  data(){
    return {
      category: "All",
      categories: [],
      active: 0
    }
  },
  methods:{
    isActive(val){
      return val === this.active;
    }
  },
  created(){

  },
  mounted(){
    this.categories = this.$store.state.allCategories;
    this.category = this.$store.state.category;
  },
  watch:{
    'category': function(val){
      this.$store.commit('setCategory', val);
    }
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
