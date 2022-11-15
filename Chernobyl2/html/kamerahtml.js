document.addEventListener('DOMContentLoaded', function (event) {
  var baseHost = document.location.origin
  var streamUrl = baseHost + ':81'

  const hide = el => {
    el.classList.add('hidden')
  }
  const show = el => {
    el.classList.remove('hidden')
  }

  const disable = el => {
    el.classList.add('disabled')
    el.disabled = true
  }

  const enable = el => {
    el.classList.remove('disabled')
    el.disabled = false
  }

  const updateValue = (el, value, updateRemote) => {
    updateRemote = updateRemote == null ? true : updateRemote
    let initialValue
    if (el.type === 'checkbox') {
      initialValue = el.checked
      value = !!value
      el.checked = value
    } else {
      initialValue = el.value
      el.value = value
    }

    if (updateRemote && initialValue !== value) {
      updateConfig(el);
    } else if(!updateRemote){
      if(el.id === "aec"){
        value ? hide(exposure) : show(exposure)
      } else if(el.id === "agc"){
        if (value) {
          show(gainCeiling)
          hide(agcGain)
        } else {
          hide(gainCeiling)
          show(agcGain)
        }
      } else if(el.id === "awb_gain"){
        value ? show(wb) : hide(wb)
      } else if(el.id === "face_recognize"){
        value ? enable(enrollButton) : disable(enrollButton)
      }
    }
  }

  function updateConfig (el) {
    let value
    switch (el.type) {
      case 'checkbox':
        value = el.checked ? 1 : 0
        break
      case 'range':
      case 'select-one':
        value = el.value
        break
      case 'button':
      case 'submit':
        value = '1'
        break
      default:
        return
    }

    const query = `${baseHost}/control?var=${el.id}&val=${value}`

    fetch(query)
      .then(response => {
        console.log(`request to ${query} finished, status: ${response.status}`)
      })
  }

  document
    .querySelectorAll('.close')
    .forEach(el => {
      el.onclick = () => {
        hide(el.parentNode)
      }
    })

  // read initial values
  fetch(`${baseHost}/status`)
    .then(function (response) {
      return response.json()
    })
    .then(function (state) {
      document
        .querySelectorAll('.default-action')
        .forEach(el => {
          updateValue(el, state[el.id], false)
        })
    })

  const view = document.getElementById('stream')
  const viewContainer = document.getElementById('stream-container')
  const stillButton = document.getElementById('get-still')
  const streamButton = document.getElementById('toggle-stream')
  const enrollButton = document.getElementById('face_enroll')
  const closeButton = document.getElementById('close-stream')

  const stopStream = () => {
    window.stop();
    streamButton.innerHTML = 'Start Stream'
  }

  const startStream = () => {
    view.src = `${streamUrl}/stream`
    show(viewContainer)
    streamButton.innerHTML = 'Stop Stream'
  }

  // Attach actions to buttons
  stillButton.onclick = () => {
    stopStream()
    view.src = `${baseHost}/capture?_cb=${Date.now()}`
    show(viewContainer)
  }

  closeButton.onclick = () => {
    stopStream()
    hide(viewContainer)
  }

  streamButton.onclick = () => {
    const streamEnabled = streamButton.innerHTML === 'Stop Stream'
    if (streamEnabled) {
      stopStream()
    } else {
      startStream()
    }
  }

  enrollButton.onclick = () => {
    updateConfig(enrollButton)
  }

  // Attach default on change action
  document
    .querySelectorAll('.default-action')
    .forEach(el => {
      el.onchange = () => updateConfig(el)
    })

  // Custom actions
  // Gain
  const agc = document.getElementById('agc')
  const agcGain = document.getElementById('agc_gain-group')
  const gainCeiling = document.getElementById('gainceiling-group')
  agc.onchange = () => {
    updateConfig(agc)
    if (agc.checked) {
      show(gainCeiling)
      hide(agcGain)
    } else {
      hide(gainCeiling)
      show(agcGain)
    }
  }

  // Exposure
  const aec = document.getElementById('aec')
  const exposure = document.getElementById('aec_value-group')
  aec.onchange = () => {
    updateConfig(aec)
    aec.checked ? hide(exposure) : show(exposure)
  }

  // AWB
  const awb = document.getElementById('awb_gain')
  const wb = document.getElementById('wb_mode-group')
  awb.onchange = () => {
    updateConfig(awb)
    awb.checked ? show(wb) : hide(wb)
  }

  // Detection and framesize
  const detect = document.getElementById('face_detect')
  const recognize = document.getElementById('face_recognize')
  const framesize = document.getElementById('framesize')

  framesize.onchange = () => {
    updateConfig(framesize)
    if (framesize.value > 5) {
      updateValue(detect, false)
      updateValue(recognize, false)
    }
  }

  detect.onchange = () => {
    if (framesize.value > 5) {
      alert("The Camera is too big!");
      updateValue(detect, false)
      return;
    }
    updateConfig(detect)
    if (!detect.checked) {
      disable(enrollButton)
      updateValue(recognize, false)
    }
  }

  recognize.onchange = () => {
    if (framesize.value > 5) {
      alert("The Camera is too big!");
      updateValue(recognize, false)
      return;
    }
    updateConfig(recognize)
    if (recognize.checked) {
      enable(enrollButton)
      updateValue(detect, true)
    } else {
      disable(enrollButton)
    }
  }
})
