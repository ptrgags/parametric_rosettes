class FourierSeries {
    /**
     * terms - an array of triples [frequency, amplitude, phase]
     * The frequencies must be listed in ascending order
     */
    constructor(terms) {
        this.terms = terms;
    }
    
    * partial_sums(t) {
        let x = 0.0;
        let y = 0.0;
        yield [0, 0,];
        for (const [frequency, amplitude, phase] of this.terms) {
            let term_x = amplitude * cos(frequency * t - phase);
            let term_y = amplitude * sin(frequency * t - phase);
            x += term_x;
            y += term_y;
            yield [x, y,];
        }
    }
    
    position(t) {
        const sums = this.partial_sums(t);
        return sums[sums.length - 1];
    }
    
    to_string() {
        let terms = [];
        for (const [frequency, amplitude, phase] of this.terms) {
            term_str = `${frequency},${amplitude},${phase}`;
        }
        return terms.join(':');
    }
}
