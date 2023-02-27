export enum MessagePacketType {
    CriticalError = 'critical_error',
    SymbolError = 'symbol_error',
    StudyError = 'study_error',
    SeriesError = 'series_error',
    ProtocolError = 'protocol_error',
    SymbolResolved = 'symbol_resolved',
    SeriesLoading = 'series_loading',
    StudyLoading = 'study_loading',
    StudyCompleted = 'study_completed',
    TimescaleUpdate = 'timescale_update',
    SeriesCompleted = 'series_completed',
    Du = 'du',
    QuoteCompleted = 'quote_completed',
    Qsd = 'qsd',
}

export enum SendPacketType {
    SetAuthToken = 'set_auth_token',
    ChartCreateSession = 'chart_create_session',
    ResolveSymbol = 'resolve_symbol',
    CreateSeries = 'create_series',
    CreateStudy = 'create_study',

    QuoteCreateSession = 'quote_create_session',
    QuoteDeleteSession = 'quote_delete_session',
    QuoteSetFields = 'quote_set_fields',
    QuoteAddSymbols = 'quote_add_symbols',
    QuoteRemoveSymbols = 'quote_remove_symbols',
    QuoteFastSymbols = 'quote_fast_symbols',

    SetLocale = 'set_locale',

    SwitchTimezone = 'switch_timezone',
}
