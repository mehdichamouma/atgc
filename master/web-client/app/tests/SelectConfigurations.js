import React from "react"

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.state.programs.size > 0) {
        let versionForm
        if(this.state.form.get("selected_program") >= 0) {
          versionForm = (
            <FormGroup controlId="formInlineEmail">
              <ControlLabel>Version</ControlLabel>
              {' '}
              <FormControl
                componentClass="select"
                placeholder="Select Configuration"
                onChange={e => this.versionChange(e.target.value)}
                value={this.state.form.get("selected_version")}
              >
                {this.getProgram(this.state.form.get("selected_program")).get("versions").map((v, index) => {
                    return (
                      <option value={index}>{v.get("code")}</option>
                    )
                })}
              </FormControl>
            </FormGroup>
          )
        }
        return (
          <div>
            <Panel>
                <Form inline componentClass="div">
                  <FormGroup controlId="formInlineName">
                    <ControlLabel>Program</ControlLabel>
                    {' '}
                    <FormControl
                      componentClass="select"
                      placeholder="Select Configuration"
                      onChange={e => this.programChange(e.target.value)}
                      value={this.state.form.get("selected_program")}
                    >
                      {this.state.programs.map((c, index) => {
                        return (
                          <option value={index}>{c.get("name")}</option>
                        )
                      })}
                    </FormControl>
                  </FormGroup>
                  {' '}
                  {versionForm}
                  {' '}
                  <Button type="submit" bsStyle="primary" onClick={this.addVersion.bind(this)} disabled={!this.canSubmit()}>
                    Add Version
                  </Button>
                </Form>
            </Panel>
            <PanelGroup>
              {this.state.selected_versions.map(v => {
                let pi = v.get("programIndex"),
                    vi = v.get("versionIndex"),
                    program = this.getProgram(pi),
                    version = this.getVersion(pi, vi),
                    header = `${program.get("name")} - ${version.get("code")}`

                return (
                      <Panel bsStyle={"primary"} header={header}>
                            {program.get('configurations').map((c, index) => {
                              let checked = v.get("selectedConfigurations").includes(index)
                              return (
                                    <Checkbox
                                        checked={checked}
                                        onClick={() => this.onSelectConfiguration(pi, vi, index)}
                                        readOnly
                                    >
                                      {c.get("label")}
                                    </Checkbox>
                              )
                            })}
                        </Panel>
                )
              })}
            </PanelGroup>
          </div>
        )
    }
  }

  addVersion() {
    console.log(this.state);
    this.setState({
      form: this.state.form.set("canSubmit", false),
      selected_versions: this.state.selected_versions.push(Map({
        programIndex: this.state.form.get("selected_program"),
        versionIndex: this.state.form.get("selected_version"),
        selectedConfigurations: List()
      }))
    })
  }

  onSelectConfiguration(pi, vi, ci) {

    let svi = this.state.selected_versions.findIndex(sv => sv.get("programIndex") == pi && sv.get("versionIndex") == vi)
    if(svi >= 0) {
        let i = this.state.selected_versions.getIn([svi, "selectedConfigurations"])
                                            .keyOf(ci)
        console.log(pi, vi, ci, i);
        this.setState({
          selected_versions: this.state.selected_versions.updateIn([svi, "selectedConfigurations"], sc => {
            return i >= 0 ?  sc.delete(i) : sc.push(ci)
          })
        })
    }
  }

  getProgram(index) {
    console.log(index);
    return this.state.programs.get(index)
  }

  getVersion(programIndex, versionIndex) {
    return this.state.programs.getIn([programIndex, "versions", versionIndex])
  }

  programChange(newIndex) {
    this.setState({
      form: this.state.form.set("selected_program", newIndex)
                           .set("selected_version", 0)
    })
  }

  versionChange(newIndex) {
    this.setState({
      form: this.state.form.set("selected_version", newIndex)
    })
  }

  canSubmit() {
    let r = this.state.selected_versions.findIndex(sv => {
      return sv.get("versionIndex") == this.state.form.get("selected_version") && sv.get("programIndex") == this.state.form.get("selected_program")
    })
    return r === -1
  }

}
