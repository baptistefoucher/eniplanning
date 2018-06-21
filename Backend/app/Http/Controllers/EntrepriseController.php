<?php

namespace App\Http\Controllers;

use Illuminate\Support\facades\Config;
use App\Models\Entreprise;
use App\Models\StagiaireParEntreprise;
use App\Models\Stagiaire;
use App\Http\Controllers\StagiaireParEntrepriseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class EntrepriseController extends Controller
{
    const TABLE_NAME= 'Entreprise';

    /**
     * Récuperer une Entreprise à partir d'un stagiaire.
     * @param  Stagiaire = Instance de Stagiaire
     * @return \Illuminate\Http\Response = Instance de Entreprise
     */
    static function getByStagiaire(Stagiaire $stagiaire)
    {
        $stagiaireParEntreprise = StagiaireParEntrepriseController::getByStagiaire($stagiaire);
        $entreprise = null;
        if (!is_null($stagiaireParEntreprise))
        {
            $entreprise = DB::table(Config::get('app.prefix_erp_tablename') . self::TABLE_NAME)
                ->where('codeEntreprise', [$stagiaireParEntreprise->CodeEntreprise])
                ->first();
        }
        return $entreprise;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Entreprise::all()->toJson();
    }
}
