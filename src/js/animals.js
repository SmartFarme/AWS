//Указываем по нажатию на какой элемент должны открыватся подменю
$("#animals-menu-list li .animals-menu-item").click(function () {
    console.log(22)
    if (false == $(this).closest(".animals-menu-item").next().is(':visible')) {
        $('#animals-menu-list ul').slideUp(350);
        $("#animals-menu-list .button").removeClass("button-active");
        $(".animals-menu-item").removeClass("active-animal-item");

        const animalsMenuId = $(this).closest(".animals-menu-item").attr("id");
        $(".animal-container").removeClass("animals-page-active")
        $(`#${animalsMenuId}-page`).addClass("animals-page-active")
        console.log($(`#${animalsMenuId}-page`))
    }
    $(this).closest(".animals-menu-item").next().slideToggle(350);
    $(this).children(".button").toggleClass("button-active");
    $(this).closest(".animals-menu-item").toggleClass("active-animal-item")
});

//Открытие и закрытие вкладки группы во вкладке обзор
$("#review-page").on("click", ".field-button", function () {
    console.log(22)
    if (false == $(this).closest(".animals-review-title").next().is(':visible')) {
        $('.group-container').slideUp(350);
        $(".review-container .field-button").removeClass("button-active");
    }
    $(this).closest(".animals-review-title").next().slideToggle(350);
    $(this).closest(".field-button").toggleClass("button-active");
});

//Открытие и закрытие всех вкладок групп во вкладке обзор
$("#review-page").on("click", ".all-field-button", function () {
    if ($(this).closest(".all-field-button").hasClass("button-active")) {
        $('.group-container').slideUp(350);
        $(this).closest(".all-field-button").removeClass("button-active");
        $(".field-button").removeClass("button-active")
    } else {
        $('.group-container').slideDown(350);
        $(this).closest(".all-field-button").addClass("button-active");
        $(".field-button").addClass("button-active")
    }

})

//В инпутах в которых размерность в кг всега должен быть 1 знак после запятой
$(".kg-input").change(function () {
    const foodValue = ($(this).closest(".kg-input").val())
    const foodValueFixed = Number(foodValue).toFixed(1)
    $(this).closest(".kg-input").val(foodValueFixed)
})

$("#monitor").click(function () {
    location.href = "http://127.0.0.1:5502/src/main.html"
})


class Group {
    constructor(title) {
        this.title = title;
    }
}

let cowGroups = [new Group("Дойные"), new Group("Нетели"), new Group("Быки"), new Group("Другие"),]
let groupList = $(`#review-page`);
//Отрисовка существующих групп
function populateGroups(currentGroups, groupsView, index) {
    groupsView.find(".animals-review-item").each(function () {
        $(this).remove()
    })
    $.each(currentGroups, function (index, value) {
        const card = `
        
            <div class="animals-review-title">
                <div class="animals-review-main">
                    <span>${value["title"]}</span>
                    <div class="value" id="flockValue${index}"></div>
                    <dic class="problem-value"></dic>
                </div>
                <button class="edit-group"></button>
                <button class="field-button"></button>
            </div>
            <div class="group-container">
                <ul class="cow-list" id="flock${index}">

                </ul>
            </div>
        
`
        const element = document.createElement('div');
        element.innerHTML = card;
        groupsView.append(element);
        element.classList.add("animals-review-item")
        console.log("Создали Элемент")
    })
    groupsView.append(`<div class="animals-review-add animals-review-item">
            <div class="animals-review-title">
                <div class="animals-review-main-info">
                    <button class="add-group-button"></button>
                    <span style="font-weight: normal;" >Добавить группу</span>
                </div>
            </div>
        </div>`)
    console.log("Создали добавление")
    // $(`#flockValue${index}`).text(`${currentHerd.length} животных`)
    // $(`#flockValue${index}`).text(herdView.length)

    // $("#flock0").closest(".animals-review-item").children(".animals-review-title").children(".animals-review-main").children(".value2").text()
}

//Добавление группы
$("#review-page").on("click", ".animals-review-add", function () {
    let title = prompt("Название")
    newGroup = new Group(title)
    herd[`herd${Object.keys(herd).length}`] = []
    cowGroups.push(newGroup);
    populateGroups(Object.values(cowGroups), groupList);
    createCows()
})

class Cow {
    constructor(id, yeldPlan, yeldFact, bullProblem, exitProblem, yeldProblem, healthProblem, foodProblem) {
        this.id = id;
        this.yeldPlan = yeldPlan;
        this.yeldFact = yeldFact;
        this.bullProblem = bullProblem;
        this.exitProblem = exitProblem;
        this.yeldProblem = yeldProblem;
        this.healthProblem = healthProblem;
        this.foodProblem = foodProblem;
    };
}

let herd = {
    "herd0": [new Cow("1", "40", "25", "no", "no", "no", "have", "no"), new Cow("2", "40", "42", "no", "no", "no", "no", "no"), new Cow("3", "40", "31", "have", "have", "have", "have", "have")],
    "herd1": [new Cow("1", "40", "25", "no", "no", "no", "have", "no"), new Cow("2", "40", "42", "no", "no", "no", "no", "no"), new Cow("3", "40", "31", "have", "have", "have", "have", "have"), new Cow("4", "40", "25", "no", "no", "no", "have", "no"), new Cow("5", "40", "42", "no", "no", "no", "no", "no"), new Cow("6", "40", "31", "have", "have", "have", "have", "have"), new Cow("7", "40", "25", "no", "no", "no", "have", "no"), new Cow("8", "40", "42", "no", "no", "no", "no", "no"), new Cow("9", "40", "31", "have", "have", "have", "have", "have")],
    "herd2": [],
    "herd3": [],
    "herd4": [],
}

//Отрисовка существующих коров
function populateCows(currentHerd, herdView, index) {
    herdView.find(".cow-list-item").each(function () {
        $(this).remove()
    })
    $.each(currentHerd, function (index, value) {
        const card = `
                        <div class="count">${value["id"]}</div>
                        <div class="yeld-statistics">
                            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.24106 0.0806332C0.0231788 0.228462 0 0.344934 0 1.33046C0 2.34735 0.0231788 2.45934 0.278146 2.58477L0.417219 2.65644V5.20986C0.417219 7.96933 0.412583 7.89318 0.672185 8.22467C0.737086 8.30531 0.880795 8.42178 0.992053 8.48001C1.17285 8.56961 1.20066 8.60544 1.22848 8.77567C1.31656 9.34907 1.68742 10.2584 2.05364 10.8139C2.2947 11.1768 2.79073 11.6695 3.15695 11.9025C3.71325 12.2653 4.37616 12.4759 5.13179 12.5386C5.46093 12.5655 5.50265 12.5789 5.63709 12.7178C5.88742 12.9731 6.01722 13 6.96291 13C7.90397 13 8.0755 12.9597 8.30265 12.6999C8.40927 12.5789 8.45099 12.5655 8.81258 12.5386C10.755 12.3908 12.104 11.1723 12.6464 9.06685L12.7669 8.60096L12.9848 8.49793C13.1007 8.4397 13.2583 8.32323 13.3278 8.24259C13.6152 7.91558 13.606 8.01861 13.6199 5.19642C13.6338 2.64748 13.6338 2.61165 13.7265 2.58477C13.7775 2.56685 13.8609 2.49069 13.9119 2.41454C13.9907 2.28463 14 2.1816 14 1.33942C14 0.344934 13.9768 0.228462 13.7589 0.0806332C13.606 -0.0268784 11.2417 -0.0268784 11.0887 0.0806332C10.8709 0.228462 10.8477 0.344934 10.8477 1.33942C10.8477 2.3787 10.8755 2.4907 11.1676 2.60717L11.3113 2.66092V5.22329V7.78566L11.4318 8.01861C11.4967 8.14852 11.6033 8.28739 11.6636 8.33666C11.8026 8.4397 11.8026 8.49345 11.6636 8.9683C11.3298 10.1375 10.755 10.8946 9.90662 11.2932C9.54503 11.468 8.97484 11.6113 8.66887 11.6113H8.5298L8.68742 11.3067C8.97484 10.7602 9.1649 10.0076 9.27152 9.01309C9.30861 8.68608 9.3457 8.52929 9.39205 8.50689C9.55894 8.4173 9.79537 8.17988 9.88808 8.00965C9.99007 7.82598 9.99007 7.80358 10.004 5.24121L10.0179 2.65196L10.1523 2.58477C10.4073 2.45934 10.4305 2.34735 10.4305 1.3215C10.4305 0.470366 10.4212 0.376291 10.3377 0.241901C10.2868 0.161267 10.1894 0.0761538 10.1245 0.0537548C10.0596 0.0268774 9.47086 0.00895882 8.79868 0.00895882H7.59338L7.43576 0.161267L7.27815 0.313577V1.28119C7.27815 2.35183 7.30132 2.45486 7.55629 2.58477L7.69536 2.65644V5.1785C7.69536 6.96589 7.70927 7.74535 7.75099 7.85286C7.82517 8.06788 8.01523 8.31427 8.19603 8.43074C8.34437 8.53377 8.34901 8.53825 8.31656 8.80703C8.22384 9.72536 8.05232 10.4331 7.82517 10.8811L7.68146 11.1633H6.95828H6.23046L6.12384 10.9483C5.87351 10.46 5.73444 9.94039 5.63245 9.10269C5.57219 8.63232 5.57219 8.58305 5.64172 8.54273C5.85497 8.4173 6.10066 8.16196 6.19338 7.96037L6.30464 7.73639V5.19194V2.64748L6.46689 2.49965L6.62914 2.35183V1.33046V0.313577L6.47152 0.161267L6.31391 0.00895882H5.10397C3.39801 0.00895882 3.47682 -0.0537567 3.47682 1.30806C3.47682 2.35631 3.50927 2.48174 3.8106 2.60269L3.98676 2.67436V5.20538V7.73639L4.09801 7.96037C4.15364 8.08132 4.29272 8.26051 4.39934 8.35458L4.5894 8.52033L4.63576 8.98174C4.74238 9.98518 4.90464 10.6527 5.19669 11.2484L5.37748 11.6247L5.10861 11.5934C4.31589 11.5038 3.82914 11.2798 3.28676 10.7602C2.93907 10.4242 2.85099 10.3122 2.65166 9.90455C2.42914 9.46554 2.17881 8.75327 2.17881 8.56065C2.17881 8.51137 2.25298 8.40834 2.3457 8.33218C2.43377 8.25603 2.5543 8.1082 2.60993 8.00965C2.71192 7.82598 2.71192 7.80358 2.72583 5.24121L2.73974 2.65196L2.87417 2.58477C3.12914 2.45934 3.15232 2.34735 3.15232 1.33046C3.15232 0.600276 3.13841 0.380772 3.08278 0.27774C2.93907 0.0134392 2.92053 0.00895882 1.57616 0.00895882C0.537748 0.00895882 0.329139 0.0179186 0.24106 0.0806332Z" fill="#006AA9"/>
</svg>
<span class="sas">${value["yeldFact"]} кг</span>
                        </div>
                        <div class="cow-indicators">
                            <div class="cow-card-icon bull-icon ${value["bullProblem"]}-problem">   
                            </div>
                            <div class="cow-card-icon cow-exit-icon ${value["exitProblem"]}-problem">
                            </div>
                            <div class="cow-card-icon yeld-icon ${value["yeldProblem"]}-problem">
                            </div>
                        </div>
                        <div class="cow-indicators">
                            <div class="cow-card-icon health-icon ${value["healthProblem"]}-problem">
                            </div>
                            <div class="cow-card-icon grass-icon ${value["foodProblem"]}-problem">
                            </div>
                        </div>

`
        const element = document.createElement('li');
        element.innerHTML = card;
        herdView.append(element);
        $(".cow-list").find("li").addClass("cow-list-item")
        console.log(herdView.length)

    })
    herdView.append(`<li class="add-cow-list-item cow-list-item">
                        <div class="add-animal">
                        </div>
                    </li>`)
    $(`#flockValue${index}`).text(`${currentHerd.length} животных`)
    // $(`#flockValue${index}`).text(herdView.length)

    // $("#flock0").closest(".animals-review-item").children(".animals-review-title").children(".animals-review-main").children(".value2").text()
}

//Добавление коровы
function createCows() {
    $(".cow-list").each(function (index) {
        let cowList = $(`#flock${index}`);
        console.log(cowList)
        populateCows(Object.values(herd)[index], cowList, index);
        let $current = $(this);

        $current.on("click", ".add-animal", function () {
            console.log(index)
            let cowList = $(`#flock${index}`);
            let id = prompt("Номер")
            let yeldPlan = 40;
            let yeldFact = 26;
            let bullProblem = "no"
            let exitProblem = "no"
            let yeldProblem = "no"
            let healthProblem = "no"
            let foodProblem = "no"
            newCow = new Cow(id, yeldPlan, yeldFact, bullProblem, exitProblem, yeldProblem, healthProblem, foodProblem)

            Object.values(herd)[index].push(newCow);
            populateCows(Object.values(herd)[index], cowList, index);
        })
    })
}

populateGroups(Object.values(cowGroups), groupList);
createCows();

const inputNumber = $("input[type='number']");

//Добавление и логика кнопок "+" и "-" у инпутов
$('<button type="button" class="minus-button">-</button>').insertBefore("input[type='number']");
$('<button type="button" class="plus-button">+</button></div>').insertAfter("input[type='number']");
const minusButton = $(".minus-button");
const plusButton = $(".plus-button");

minusButton.each(function (index) {
    $(this).on("click", function (evt) {
        let inputNumber = $(evt.target).next("input[type='number']");
        inputNumber[0].stepDown();
        inputNumber.change();
    })
});

plusButton.each(function (index) {
    $(this).on("click", function (evt) {
        let inputNumber = $(evt.target).prev("input[type='number']");
        inputNumber[0].stepUp();
        inputNumber.change();
    })
});


//Слайдер вкладки сортировки
$("#sort").click(function () {
    const fromSlider = document.querySelector('#fromSlider');
    const toSlider = document.querySelector('#toSlider');
    const fromInput = document.querySelector('#fromInput');
    const toInput = document.querySelector('#toInput');
    fillSlider(fromSlider, toSlider, '#808080', '#0B9DDD', toSlider);
    setToggleAccessible(toSlider);


    let off = fromSlider.offsetWidth / (parseInt(fromSlider.max) - parseInt(fromSlider.min));

    let px = ((fromSlider.valueAsNumber - parseInt(fromSlider.min)) * off) - (fromInput.offsetParent.offsetWidth / 2);

    let toOff = toSlider.offsetWidth / (parseInt(toSlider.max) - parseInt(toSlider.min));
    let toPx = ((toSlider.valueAsNumber - parseInt(toSlider.min)) * toOff) - (toInput.offsetParent.offsetWidth / 2);


    toInput.parentElement.style.left = toPx + 'px';
    console.log(toInput.offsetParent.offsetWidth)
    toInput.parentElement.style.top = -72 + 'px';

    console.log(toInput.top)
    fromInput.parentElement.style.left = px + 'px';

    console.log(fromInput.parentElement.style.left)

    fromInput.parentElement.style.top = -72 + 'px';



    function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, '#808080', '#0B9DDD', controlSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromSlider.value = from;
        }
        let px = ((fromInput.valueAsNumber - parseInt(fromInput.min)) * off) - (fromInput.offsetParent.offsetWidth / 2);
        fromInput.parentElement.style.left = px + 'px';

        if ((toSlider.value - fromSlider.value) < 2) {
            fromInput.parentElement.style.top = 12 + "px"
        } else {
            fromInput.parentElement.style.top = -72 + "px"
        }
        console.log("CatchTwo")
    }

    function controlToInput(toSlider, fromInput, toInput, controlSlider) {
        const [from, to] = getParsed(fromInput, toInput);
        fillSlider(fromInput, toInput, '#808080', '#0B9DDD', controlSlider);
        setToggleAccessible(toInput);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
        }
        let toPx = ((toInput.valueAsNumber - parseInt(toInput.min)) * toOff) - (toInput.offsetParent.offsetWidth / 2);
        toInput.parentElement.style.left = toPx + 'px';

        if ((toSlider.value - fromSlider.value) < 2) {
            fromInput.parentElement.style.top = 12 + "px"
        } else {
            fromInput.parentElement.style.top = -72 + "px"
        }
    }

    function controlFromSlider(fromSlider, toSlider, fromInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#808080', '#0B9DDD', toSlider);
        if (from > to) {
            fromSlider.value = to;
            fromInput.value = to;
        } else {
            fromInput.value = from;
        }
        let px = ((fromSlider.valueAsNumber - parseInt(fromSlider.min)) * off) - (fromInput.offsetParent.offsetWidth / 2);
        fromInput.parentElement.style.left = px + 'px';
        if ((toSlider.value - fromSlider.value) < 2) {
            fromInput.parentElement.style.top = 12 + "px"
        } else {
            fromInput.parentElement.style.top = -72 + "px"
        }
    }

    function controlToSlider(fromSlider, toSlider, toInput) {
        const [from, to] = getParsed(fromSlider, toSlider);
        fillSlider(fromSlider, toSlider, '#808080', '#0B9DDD', toSlider);
        setToggleAccessible(toSlider);
        if (from <= to) {
            toSlider.value = to;
            toInput.value = to;
        } else {
            toInput.value = from;
            toSlider.value = from;
        }
        let toPx = ((toSlider.valueAsNumber - parseInt(toSlider.min)) * toOff) - (toInput.offsetParent.offsetWidth / 2);
        toInput.parentElement.style.left = toPx + 'px';
        if ((toSlider.value - fromSlider.value) < 2) {
            fromInput.parentElement.style.top = 12 + "px"
        } else {
            fromInput.parentElement.style.top = -72 + "px"
        }
    }

    function getParsed(currentFrom, currentTo) {
        const from = parseInt(currentFrom.value, 10);
        const to = parseInt(currentTo.value, 10);
        return [from, to];
    }

    function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
        const rangeDistance = to.max - to.min;
        const fromPosition = from.value - to.min;
        const toPosition = to.value - to.min;
        controlSlider.style.background = `linear-gradient(
to right,
${sliderColor} 0%,
${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
${sliderColor} 100%)`;
    }

    function setToggleAccessible(currentTarget) {
        const toSlider = document.querySelector('#toSlider');
        if (Number(currentTarget.value) <= 0) {
            toSlider.style.zIndex = 2;
        } else {
            toSlider.style.zIndex = 0;
        }
    }


    fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
    toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
    fromInput.onchange = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
    toInput.onchange = () => controlToInput(toSlider, fromInput, toInput, toSlider);
    // Handler for .load() called.
});
