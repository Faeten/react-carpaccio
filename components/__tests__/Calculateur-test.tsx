import {describe, it, expect} from "vitest";
import {render} from "@testing-library/react";
import Calculateur from "@/components/Calculateur";

describe('<Calculateur>', () => {
    it('should render correctly', () => {
        const {container} = render(<Calculateur></Calculateur>)
        expect(container.firstChild).toMatchInlineSnapshot()
    })
})