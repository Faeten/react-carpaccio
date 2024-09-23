import React, {useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {REDUCTIONS, TAXES} from '@/constants/Commande'

function calculerPrixTotal(nombreArticles, prixParArticle, etat){
    const totalBrut = nombreArticles * prixParArticle;
    const totalReduit = totalBrut - recupererMontantReduction(totalBrut);
    console.log("nb articles " + nombreArticles);
    console.log("prix articles " + prixParArticle);
    console.log("code " + etat);
    console.log("total brut " + totalBrut);
    console.log("total reduit " + totalReduit);
    return totalReduit + recupererMontantTaxe(totalReduit, etat);
}

function recupererMontantReduction(prix){
    let tauxReduction = 0
    for(const reduction of REDUCTIONS)
    {
        if(prix >= reduction.valeur){
            tauxReduction =  reduction.taux * prix;
            break;
        }
    }
    return tauxReduction;
}

function recupererMontantTaxe(prix, tauxTaxe){
    console.log('prix ' + prix)
    console.log('taux taxe : ' + tauxTaxe)
    return prix * tauxTaxe;
}

export default function Calculateur () {
    const [nombreArticles, setNombreArticles] = useState(0);
    const [prixParArticle, setPrixParArticle] = useState(0);
    const [codeEtat, setCodeEtat] = useState(TAXES[0].taux);
    const [prixCommande, setPrixCommande] = useState(0);

    const lancerCalcul = () => {
        const calculatedResult = calculerPrixTotal(nombreArticles, prixParArticle, codeEtat);
        console.log(calculatedResult)
        setPrixCommande(calculatedResult);
    };

    function handleCodeEtatChange(code) {
        setCodeEtat(code.target.value);
    }

    return (
        <div>
            <Text>Nombre d'articles :</Text>
            <TextInput
                keyboardType="numeric"
                onChangeText={text => setNombreArticles(parseInt(text) || 0)}
            />

            <Text>Prix par article :</Text>
            <TextInput
                keyboardType="numeric"
                onChangeText={text => setPrixParArticle(parseFloat(text) || 0)}
            />

            <select
                value={codeEtat}  // Stocke la valeur sélectionnée
                onChange={handleCodeEtatChange}  // Fonction pour gérer le changement
            >
                {TAXES.map((tax) => (
                    <option key={tax.id} value={tax.taux}>
                        {tax.code}
                    </option>
                ))}
            </select>


            <Button title="Calculer" onPress={lancerCalcul}/>

            {prixCommande > 0 && (
                <View>
                    <Text>Prix de la commande : {prixCommande} $</Text>
                </View>
            )}
        </div>
    );
}

