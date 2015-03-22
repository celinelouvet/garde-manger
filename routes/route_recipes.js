var express = require('express');
var router = express.Router();

var recipes = [
    {
        "title": "Cake à la mozzarella",
        "type": "Apéritif",
        "parent": "cakes",
        "serves": 6,
        "prepare": "15 min",
        "cook": "45 min",
        "rest": "",
        "ingredients": {
            "tomates confites": "100 g",
            "mozzarella": "1",
            "jambon de Parme": "3 tranches fines",
            "farine": "200 g",
            "lait": "10 cl",
            "oeufs": "3",
            "levure": "1 sachet",
            "beurre": "25 g (pour le moule)",
            "huile d’olive": "10 cl",
            "sel fin": "1/2 cc",
            "poivre moulu": "1/2 cc"
        },
        "steps": [
            "Préchauffez le four th. 7 (210°C). Versez la farine et la levure dans un saladier.",
            "Creusez un puits au centre. Versez l’huile et le lait, salez et poivrez.",
            "Mélangez en incorporant les œufs un par un.",
            "Coupez les tomates confites en lamelles, la mozzarella en dés et le jambon en lanières.",
            "Ajoutez les tomates, la mozzarella et le jambon de Parme à la pâte. Mélangez bien.",
            "Beurrez et farinez un moule à cake.",
            "Versez la pâte et tapez doucement le fond du moule sur le plan de travail pour faire partir d’éventuelles bulles d’air. Enfournez et faites cuire 10 min, puis baissez le four th.6 (180°C) et prolongez la cuisson 35 min.",
            "Vérifiez la cuisson avec la lame d’un couteau.",
            "Elle doit ressortir sèche et le cake doit être bombé et bien doré.",
            "Laissez tiédir et démoulez sur une grille.",
            "Servez tiède ou froid."
        ]
    }
];

var listRecipes = function (req, res) {
    res.status(200).json(recipes);
};

router.get('/recipe', listRecipes);

module.exports = router;
