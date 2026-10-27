import { render, screen } from '@testing-library/react';

import Competences from '../Competences';
import { Competences as CompetenceList } from '@app/interfaces/competence.types';
import competencesMock from './mocks/competencesMock.json';

describe('Competences component', () => {
  it.each(competencesMock)('render the all elements', ({ title, description}) => {
    render(<Competences competences={competencesMock} />);
    
    const titleElement = screen.getByText(title);
    const descriptionElement = screen.getByText(description);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('renders an empty list when competences is not an array', () => {
    // Quando o backend responde com erro, o hook entrega o corpo da resposta, que é um objeto.
    const errorBody = { message: 'Erro interno' } as unknown as CompetenceList;

    const { container } = render(<Competences competences={errorBody} />);

    expect(container.querySelector('.MuiGrid-container')).toBeEmptyDOMElement();
  });
});
