import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'areaMap'
    ]),
  },
  methods: {
    /*
    * 获取省市区的label
    */
    getAreaMapLabel(selected) {
      const areaMap = this.areaMap;

      //具体实现
      return function matchLabel(k = 0, data = areaMap, res = []) {
        for (let i in data) {
          const item = data[i];
          if (item.value === selected[k]) {
            res.push(item.label);
            if (item.children) {
              matchLabel(++k, item.children, res);
            }
            break;
          }
        }
        return res;
      }()
    }
  },
  async created() {
    this.$store.dispatch('app/areaMap')
  }
};
