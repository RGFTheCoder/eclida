export interface IClonable<Implementer extends IClonable<Implementer>> {
	clone(): Implementer;
}
