const app = getApp();

const Data = {
  inital: true,
};

Component({
  properties: {
    list: null,
    page: null,
  },

  lifetimes: {
    detached() {
      Data.inital = true;
    },
  },

  methods: {
    changePage(e) {
      const type = e.currentTarget.dataset.type;
      let page = type === 'prev' ? -1 : 1;
      page += this.data.page;
      this.triggerEvent('changepage', { page }, {});
    },

    tapItem(e) {
      this.triggerEvent('tapitem', {
        index: e.currentTarget.dataset.index,
        data: this.data.list[e.currentTarget.dataset.index],
      }, {});
    },
  },
});
