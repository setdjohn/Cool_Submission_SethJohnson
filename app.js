Vue.component("character", {
    data: function () {
        return {
            buttonText: this.name,
            codeNameFront: false
        };
    },
    props: ["name", "cname", "flipped"],
    methods: {
        flipFunction: function () {
            if (this.codeNameFront) {
                this.buttonText = this.name;
            } else {
                this.buttonText = this.cname;
            }
            this.codeNameFront = !this.codeNameFront;
            this.flipped = !this.flipped;
        }
    },
    template: `<button v-on:click="flipFunction" v-bind:class="{backgroundFlip: flipped}">{{buttonText}}</button>`
});

var app = new Vue({
    el: "#app",
    data: {
        name: "",
        email: "",
        nameGood: false,
        emailGood: false,
        list: [
            { name: "Protagonist", codename: "Joker", flipped: false },
            { name: "Anne", codename: "Panther", flipped: false },
            { name: "Ryuji", codename: "Skull", flipped: false }
        ]
    },

    watch: {
        name: function () {
            if (this.name.length >= 2) {
                this.nameGood = true;
            } else {
                this.nameGood = false;
            }
        },

        email: function () {
            var validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var result = validEmail.test(this.email);

            if (result) {
                this.emailGood = true;
            } else {
                this.emailGood = false;
            }
        }
    },

    computed: {
        submit: function () {
            if (this.name.length < 1 && this.email.length < 1) {
                return "";
            } else if (this.nameGood && this.emailGood) {
                return "Submitted";
            } else {
                return "Not Submitted";
            }
        },


        whatLeft: function () {
            if (this.name.length < 1 && this.email.length < 1) {
                return "";
            } else if (!this.nameGood && !this.emailGood) {
                return "Name needs 2 characters & email needs to be valid";
            } else if (!this.nameGood && this.emailGood) {
                return "Your name needs at least 2 characters";
            } else if (this.nameGood && !this.emailGood) {
                return "Your email needs to be a valid";
            } else {
                return "";
            }
        }
    }
});
