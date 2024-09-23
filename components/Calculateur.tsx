import React, {useState} from 'react';
import { REDUCTIONS, TAXES } from '@/constants/Commande';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography, Box } from '@mui/material';

function calculerPrixTotal(nombreArticles, prixParArticle, etat){
    const totalBrut = nombreArticles * prixParArticle;
    const totalReduit = totalBrut - recupererMontantReduction(totalBrut);
    return totalReduit + recupererMontantTaxe(totalReduit, etat);
}

function recupererMontantReduction(prix){
    let tauxReduction = 0;
    for(const reduction of REDUCTIONS){
        if(prix >= reduction.valeur){
            tauxReduction = reduction.taux * prix;
            break;
        }
    }
    return tauxReduction;
}

function recupererMontantTaxe(prix, tauxTaxe){
    return prix * tauxTaxe;
}

export default function Calculateur () {
    const [nombreArticles, setNombreArticles] = useState(0);
    const [prixParArticle, setPrixParArticle] = useState(0);
    const [codeEtat, setCodeEtat] = useState(TAXES[0].taux);
    const [prixCommande, setPrixCommande] = useState(0);

    const lancerCalcul = () => {
        const calculatedResult = calculerPrixTotal(nombreArticles, prixParArticle, codeEtat);
        setPrixCommande(calculatedResult);
    };

    const handleCodeEtatChange = (event) => {
        setCodeEtat(event.target.value);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ marginTop: 4, padding: 2, boxShadow: 3, borderRadius: 2, maxWidth: 400, margin: 'auto' }}
        >
            <Typography variant="h4" gutterBottom>Calculateur de prix</Typography>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Nombre d'articles"
                    type="number"
                    value={nombreArticles}
                    onChange={(e) => setNombreArticles(parseInt(e.target.value) || 0)}
                    variant="outlined"
                    slotProps={{ htmlInput: {min:0}}}
                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <TextField
                    label="Prix par article"
                    type="number"
                    value={prixParArticle}
                    onChange={(e) => setPrixParArticle(parseFloat(e.target.value) || 0)}
                    variant="outlined"
                    slotProps={{ htmlInput: {min:0}}}
                />
            </FormControl>

            <FormControl fullWidth margin="normal" variant={"outlined"}>
                <InputLabel id="select-etat-label">État</InputLabel>
                <Select
                    labelId="select-etat-label"
                    value={codeEtat}
                    onChange={handleCodeEtatChange}
                    variant="outlined"
                    label="État"
                >
                    {TAXES.map((tax) => (
                        <MenuItem key={tax.id} value={tax.taux}>
                            {tax.code}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={lancerCalcul} sx={{ marginTop: 2 }}>
                Calculer
            </Button>

            {prixCommande > 0 && (
                <Box mt={2}>
                    <Typography variant="h6">
                        Prix de la commande : {prixCommande.toFixed(2)} $
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
