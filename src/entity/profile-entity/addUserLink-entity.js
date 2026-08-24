import { ProfileRepository } from "../../repository/profile-repository.js";


export class AddUserLinkEntity {
    constructor(id, url, category_1, category_2, category_3, isMusic) {
        this.id = id;
        this.url = url;
        this.embed = null;
        this.category_1 = category_1;
        this.category_2 = category_2 ?? null;
        this.category_3 = category_3 ?? null;
        this.isMusic = isMusic;
    }

    DataValidation(req) {
        if (!this.id)
            throw new Error('Usuario no autenticado');
        if (typeof(this.id) != "number")
            throw new Error('Error en credenciales del usuario');
        if (!this.url || !this.category_1)
            throw new Error('URL y/o categoria#1 no encontrada');
    }

    ValidateURL() {
        try {
            const link = new URL(this.url);
            const { host, hostname, href, origin, search, searchParams, pathname} = link;

            if (!hostname || !origin  || !search)
                throw new Error('URL no valida');
        } catch (error) {
            console.log(error);
        }
    }

    CreateYoutubeEmbed() {
        try {
            const link = new URL(this.url);
            const { origin, searchParams, pathname} = link;

            if (!searchParams.get('v') || !searchParams.get('viewkey'))
                this.embed = `https://www.youtube.com/embed${pathname}`;
            if (searchParams.get('v'))
                this.embed = `${origin}/embed/${searchParams.get('v')}`;
            if (searchParams.get('viewkey'))
                this.embed = `${origin}/embed/${searchParams.get('viewkey')}`;

        } catch (error) {
            throw new Error('Error al crear embed del link');
        }
    }

    async GetUserLinks() {
        try {
            return await ProfileRepository.GetUserLinksDB(this.id, this.usertag);
        } catch (error) {
            throw new Error(error.message);
            
        }
    }
}