export interface Performance {
    performance_id: number;
    artist_id: number;
    stage_id?: number;
    start_time?: string | Date;
    end_time?: string | Date;
    date: string | Date;
}

//Mesmo que o modelo no banco de dados seja definido para usar tipos de data, a forma como esses dados são recebidos no frontend pode variar. Se estiverem chegando como strings, a conversão para Date ainda será necessária. Se já estiverem como Date, você pode simplesmente seguir em frente sem necessidade de conversão.