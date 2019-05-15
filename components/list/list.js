Component({
    properties: {
        imageUrl: {
            type: String,
            value: '../../pages/img/computer.png'
        },
        placeholder: {
            type: String,
            value: ''
        },
        title: {
            type: String,
            value: '购物指南'
        },
        params: {
            type: String,
            value: ''
        }
    },
    methods: {
        _listFunction: function () {
            console.log(this.properties)
            this.triggerEvent('listFunction', { params: this.properties.params })
        }
    }
})