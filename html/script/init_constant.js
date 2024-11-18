export class Names {
    constructor() {
        this.FIRST_DAY_NAME = document.querySelector('#first-day .name');
        this.SECOND_DAY_NAME = document.querySelector('#second-day .name');
        this.THIRD_DAY_NAME = document.querySelector('#third-day .name');
        this.FOURTH_DAY_NAME = document.querySelector('#fourth-day .name');
        this.FIFTH_DAY_NAME = document.querySelector('#fifth-day .name');
    }
}

export class Icons {
    constructor() {
        this.FIRST_DAY_ICON = document.querySelector('#first-day .icon');
        this.SECOND_DAY_ICON = document.querySelector('#second-day .icon');
        this.THIRD_DAY_ICON = document.querySelector('#third-day .icon');
        this.FOURTH_DAY_ICON = document.querySelector('#fourth-day .icon');
        this.FIFTH_DAY_ICON = document.querySelector('#fifth-day .icon');
    }
}

export class Temps {
    constructor() {
        this.FIRST_DAY_TEMP = document.querySelector('#first-day .temp');
        this.SECOND_DAY_TEMP = document.querySelector('#second-day .temp');
        this.THIRD_DAY_TEMP = document.querySelector('#third-day .temp');
        this.FOURTH_DAY_TEMP = document.querySelector('#fourth-day .temp');
        this.FIFTH_DAY_TEMP = document.querySelector('#fifth-day .temp');
    }
}

export class Days {
    constructor() {
        this.FIRST_DAY_NAME = document.querySelector('#first-day .name');
        this.SECOND_DAY_NAME = document.querySelector('#second-day .name');
        this.THIRD_DAY_NAME = document.querySelector('#third-day .name');
        this.FOURTH_DAY_NAME = document.querySelector('#fourth-day .name');
        this.FIFTH_DAY_NAME = document.querySelector('#fifth-day .name');
    }
    setDays(days) {
        this.FIRST_DAY_NAME.innerText = this.getDayByTime(days[0]);
        this.SECOND_DAY_NAME.innerText = this.getDayByTime(days[1]);
        this.THIRD_DAY_NAME.innerText = this.getDayByTime(days[2]);
        this.FOURTH_DAY_NAME.innerText = this.getDayByTime(days[3]);
        this.FIFTH_DAY_NAME.innerText = this.getDayByTime(days[4]);
    }

    getDayByTime(date) {
        var day = new Date();
        day.setTime(date);
        switch (day.getDay()) {
            case 0:
                return `Sun`;
            case 1:
                return `Mon`;
            case 2:
                return `Tue`;
            case 3:
                return `Wed`;
            case 4:
                return `Thu`;
            case 5:
                return `Fri`;
            case 6:
                return `Sat`;
        }
    }
}