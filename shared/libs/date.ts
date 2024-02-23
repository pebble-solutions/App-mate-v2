type TimeFormatOptionsType = {
    hours?: boolean,
    minutes?: boolean,
    seconds?: boolean
}

class TimeFormatOptions {
    hours: boolean
    minutes: boolean
    seconds: boolean

    constructor(options?: TimeFormatOptionsType) {
        this.hours = options?.hours || true
        this.minutes = options?.minutes || true
        this.seconds = options?.seconds || false
    }

}

/**
 * Retourne la durée entre deux date au format H:MM:SS
 *
 * @param {Date} start
 * @param {Date} end
 * @param {TimeFormatOptionsType} options
 *
 * @return {string}
 */
export function diffDateToTime(start: Date, end: Date, options?: TimeFormatOptionsType): string {
    return secondsToTimeString(diffDate(start, end) / 1000, options);
}


/**
 * Convertie un horaire sur deux digit (ex 5 => 05)
 * @param {number|string} time Durée à convertir
 * @returns {string}
*/
export function padTime(time: number | string): string {
    if (typeof time !== 'string') {
        time = time.toString();
    }
    
    return time.padStart(2, "0");
}

/**
 * Transforme une date SQL en une date ISO8601
 * @param {String} date Date SQL à transformer
 * @returns {String}
*/
export function sqlDateToIso(date: string): string | null  {
    if (date) {
        date = date.replace(/(\d{4}-\d{2}-\d{2})\s/, '$1T');
        return date;
    }
    return null;
}

/**
 * Retourne l'intervalle entre deux dates en millisecondes
 * 
 * @param {Date} start        Date de début de l'intervalle
 * @param {Date} end          Date de fin de l'intervalle
 * 
 * @returns {number} La diférence en milliseconde
 */
export function diffDate(start: Date, end: Date): number {
    return end.getTime() - start.getTime();
}

/**
 * Convertie un nombre de secondes (entier ou décimal) en durée.
 * Ex : 65 => 1:05
 * 
 * @param {number} time         Temps en secondes
 * @param {string} options      Format retourné
 *
 * @returns {string}
 */
export function secondsToTimeString(time: number, options?: TimeFormatOptionsType): string {
    options = new TimeFormatOptions(options)

    const hours = Math.floor(time / 3600);
    time %= 3600;
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);

    let val = ""

    if (options.hours) {
        val += hours.toString()
    }

    if (options.minutes) {
        if (val) val += ":"
        val += padTime(minutes)
    }

    if (options.seconds) {
        if (val) val += ":"
        val += padTime(seconds)
    }

    return val;
}

/**
 * Convertie un objet date en une chaine de caractère date SQL
 * AAAA-MM-JJ
 * AAAA-MM-JJ HH:II:SS (si useTime est true)
 * 
 * @param {Date} date La date à transformer
 * @param {boolean} useTime Si true, retourne aussi les heures
 * 
 * @return {string}
 */
export function toSqlDate(date: Date, useTime: boolean): string {
	let dateSql = date.getFullYear()         + '-' +
	padTime(date.getMonth() + 1)  + '-' +
	padTime(date.getDate());
	
	if (useTime) {
		dateSql += ' '+
			padTime(date.getHours())      + ':' +
			padTime(date.getMinutes())    + ':' +
			padTime(date.getSeconds());
	}

	return dateSql;
}




/**
 * Retourne la date SQL au format H:MM ou J+1 H:MM.
 *
 * @param {string} val La date à convertir
 * @param {string} refVal La valeur précédente (pour avoir le J+1 sur la date de fin)
 *
 * @return {string | null} La date au format spécifié ou null si une des dates est invalide
 */
export function dateToTime(val: string, refVal: string): string | null {
    if (val) {
        const isoVal = sqlDateToIso(val);
        if (isoVal) {
            const date = new Date(isoVal);
            if (!isNaN(date.getTime())) {
                let str = date.getHours() + ":" + padTime(date.getMinutes());
                if (refVal) {
                    const isoRefVal = sqlDateToIso(refVal);
                    if (isoRefVal) {
                        const refDate = new Date(isoRefVal);
                        if (!isNaN(refDate.getTime())) {
                            if (refDate.getDate() !== date.getDate()) {
                                str = "J+1 " + str;
                            }
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
                return str;
            }
        } else {
            return null;
        }
    }
    return null;
}

/**
 * Retourne la date  au format litttéral français
 *@param {Date} date La date à transformer
 *@return {string}
 */
export function dateToLiteral(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
}
